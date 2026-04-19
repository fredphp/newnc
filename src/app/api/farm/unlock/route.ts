import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 解锁土地
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { landId } = body;

    if (!landId) {
      return NextResponse.json({ error: '缺少土地ID' }, { status: 400 });
    }

    // 获取土地信息
    const land = await db.land.findFirst({
      where: {
        id: landId,
        userId: user.id,
        isUnlocked: false,
      },
    });

    if (!land) {
      return NextResponse.json({ error: '土地不存在或已解锁' }, { status: 400 });
    }

    // 检查用户金币是否足够
    if (user.coins < land.unlockPrice) {
      return NextResponse.json({
        error: '金币不足',
        required: land.unlockPrice,
        current: user.coins,
      }, { status: 400 });
    }

    // 解锁土地（事务）
    await db.$transaction(async (tx) => {
      // 扣除金币
      await tx.user.update({
        where: { id: user.id },
        data: { coins: { decrement: land.unlockPrice } },
      });

      // 解锁土地
      await tx.land.update({
        where: { id: land.id },
        data: { isUnlocked: true },
      });

      // 记录交易
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'unlock',
          amount: -land.unlockPrice,
          description: `解锁第 ${land.position} 块土地`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: `成功解锁第 ${land.position} 块土地！`,
      cost: land.unlockPrice,
    });
  } catch (error) {
    console.error('解锁土地错误:', error);
    return NextResponse.json({ error: '解锁失败，请稍后重试' }, { status: 500 });
  }
}
