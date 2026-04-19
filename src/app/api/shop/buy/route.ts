import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 购买商品
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { shopItemId, quantity = 1 } = body;

    if (!shopItemId || quantity < 1) {
      return NextResponse.json({ error: '参数无效' }, { status: 400 });
    }

    // 获取商品信息
    const shopItem = await db.shopItem.findUnique({
      where: { id: shopItemId },
    });

    if (!shopItem || !shopItem.isActive) {
      return NextResponse.json({ error: '商品不存在' }, { status: 400 });
    }

    // 检查等级限制
    if (user.level < shopItem.minLevel) {
      return NextResponse.json({
        error: `需要等级 ${shopItem.minLevel} 才能购买`,
      }, { status: 400 });
    }

    // 检查库存
    if (shopItem.stock !== -1 && shopItem.stock < quantity) {
      return NextResponse.json({ error: '库存不足' }, { status: 400 });
    }

    // 计算总价
    const totalPrice = shopItem.price * quantity;

    // 检查用户金币
    if (user.coins < totalPrice) {
      return NextResponse.json({
        error: '金币不足',
        required: totalPrice,
        current: user.coins,
      }, { status: 400 });
    }

    // 开始购买（事务）
    await db.$transaction(async (tx) => {
      // 扣除金币
      await tx.user.update({
        where: { id: user.id },
        data: { coins: { decrement: totalPrice } },
      });

      // 更新库存（如果不是无限库存）
      if (shopItem.stock !== -1) {
        await tx.shopItem.update({
          where: { id: shopItemId },
          data: { stock: { decrement: quantity } },
        });
      }

      // 添加到用户背包
      const existingItem = await tx.inventory.findFirst({
        where: {
          userId: user.id,
          itemType: shopItem.type,
          itemId: shopItem.itemId,
        },
      });

      if (existingItem) {
        await tx.inventory.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: quantity } },
        });
      } else {
        await tx.inventory.create({
          data: {
            userId: user.id,
            itemType: shopItem.type,
            itemId: shopItem.itemId,
            quantity,
          },
        });
      }

      // 记录交易
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'buy',
          amount: -totalPrice,
          description: `购买 ${shopItem.name} x${quantity}`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: `成功购买 ${shopItem.name} x${quantity}`,
      cost: totalPrice,
    });
  } catch (error) {
    console.error('购买错误:', error);
    return NextResponse.json({ error: '购买失败，请稍后重试' }, { status: 500 });
  }
}
