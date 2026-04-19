import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 出售作物
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { inventoryId, quantity = 1 } = body;

    if (!inventoryId || quantity < 1) {
      return NextResponse.json({ error: '参数无效' }, { status: 400 });
    }

    // 获取背包物品
    const inventoryItem = await db.inventory.findFirst({
      where: {
        id: inventoryId,
        userId: user.id,
      },
    });

    if (!inventoryItem) {
      return NextResponse.json({ error: '物品不存在' }, { status: 400 });
    }

    if (inventoryItem.quantity < quantity) {
      return NextResponse.json({ error: '数量不足' }, { status: 400 });
    }

    // 只能出售作物
    if (inventoryItem.itemType !== 'crop') {
      return NextResponse.json({ error: '只能出售作物' }, { status: 400 });
    }

    // 获取作物详情
    const crop = await db.cropTemplate.findUnique({
      where: { id: inventoryItem.itemId },
    });

    if (!crop) {
      return NextResponse.json({ error: '作物信息不存在' }, { status: 400 });
    }

    // 计算收益
    const earnings = crop.sellPrice * quantity;

    // 开始出售（事务）
    await db.$transaction(async (tx) => {
      // 减少背包数量
      if (inventoryItem.quantity === quantity) {
        await tx.inventory.delete({
          where: { id: inventoryId },
        });
      } else {
        await tx.inventory.update({
          where: { id: inventoryId },
          data: { quantity: { decrement: quantity } },
        });
      }

      // 增加金币
      await tx.user.update({
        where: { id: user.id },
        data: { coins: { increment: earnings } },
      });

      // 记录交易
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'sell',
          amount: earnings,
          description: `出售 ${crop.name} x${quantity}`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: `成功出售 ${crop.name} x${quantity}`,
      earnings,
    });
  } catch (error) {
    console.error('出售错误:', error);
    return NextResponse.json({ error: '出售失败，请稍后重试' }, { status: 500 });
  }
}
