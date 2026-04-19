import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 种植作物
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { landId, cropId } = body;

    if (!landId || !cropId) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 检查土地是否属于当前用户
    const land = await db.land.findFirst({
      where: {
        id: landId,
        userId: user.id,
        isUnlocked: true,
      },
    });

    if (!land) {
      return NextResponse.json({ error: '土地不存在或未解锁' }, { status: 400 });
    }

    // 检查土地是否已有作物
    const existingCrop = await db.plantedCrop.findUnique({
      where: { landId },
    });

    if (existingCrop && !existingCrop.isHarvested) {
      return NextResponse.json({ error: '该土地上已有作物' }, { status: 400 });
    }

    // 检查用户是否有该种子
    const inventory = await db.inventory.findFirst({
      where: {
        userId: user.id,
        itemType: 'seed',
        itemId: cropId,
        quantity: { gt: 0 },
      },
    });

    if (!inventory) {
      return NextResponse.json({ error: '没有该种子' }, { status: 400 });
    }

    // 检查作物是否存在
    const crop = await db.cropTemplate.findUnique({
      where: { id: cropId },
    });

    if (!crop) {
      return NextResponse.json({ error: '作物不存在' }, { status: 400 });
    }

    // 检查用户等级是否足够
    if (user.level < crop.minLevel) {
      return NextResponse.json({ error: `需要等级 ${crop.minLevel} 才能种植此作物` }, { status: 400 });
    }

    // 开始种植（事务）
    await db.$transaction(async (tx) => {
      // 减少种子数量
      if (inventory.quantity === 1) {
        await tx.inventory.delete({
          where: { id: inventory.id },
        });
      } else {
        await tx.inventory.update({
          where: { id: inventory.id },
          data: { quantity: { decrement: 1 } },
        });
      }

      // 如果有已收获的作物记录，删除它
      if (existingCrop) {
        await tx.plantedCrop.delete({
          where: { id: existingCrop.id },
        });
      }

      // 创建种植记录
      await tx.plantedCrop.create({
        data: {
          landId,
          cropId,
          plantedAt: new Date(),
          isHarvested: false,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: `成功种植 ${crop.name}`,
    });
  } catch (error) {
    console.error('种植错误:', error);
    return NextResponse.json({ error: '种植失败，请稍后重试' }, { status: 500 });
  }
}
