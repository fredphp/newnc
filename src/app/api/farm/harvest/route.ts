import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { calculateCropStatus } from '../lands/route';

// 收获作物
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
      },
      include: {
        plantedCrop: {
          include: {
            crop: true,
          },
        },
      },
    });

    if (!land) {
      return NextResponse.json({ error: '土地不存在' }, { status: 400 });
    }

    if (!land.plantedCrop || land.plantedCrop.isHarvested) {
      return NextResponse.json({ error: '该土地上没有可收获的作物' }, { status: 400 });
    }

    // 计算作物状态
    const status = calculateCropStatus(
      land.plantedCrop.plantedAt,
      land.plantedCrop.crop.growthTime,
      land.plantedCrop.crop.stageCount,
      land.plantedCrop.isHarvested
    );

    if (!status.isReady) {
      return NextResponse.json({
        error: '作物尚未成熟',
        remainingTime: status.remainingTime,
      }, { status: 400 });
    }

    const crop = land.plantedCrop.crop;
    const expGain = crop.expReward;

    // 开始收获（事务）
    const result = await db.$transaction(async (tx) => {
      // 标记作物为已收获
      await tx.plantedCrop.update({
        where: { id: land.plantedCrop!.id },
        data: {
          isHarvested: true,
          harvestedAt: new Date(),
        },
      });

      // 添加作物到背包
      const existingCrop = await tx.inventory.findFirst({
        where: {
          userId: user.id,
          itemType: 'crop',
          itemId: crop.id,
        },
      });

      if (existingCrop) {
        await tx.inventory.update({
          where: { id: existingCrop.id },
          data: { quantity: { increment: 1 } },
        });
      } else {
        await tx.inventory.create({
          data: {
            userId: user.id,
            itemType: 'crop',
            itemId: crop.id,
            quantity: 1,
          },
        });
      }

      // 增加用户经验值
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          exp: { increment: expGain },
        },
      });

      // 检查是否升级
      const expPerLevel = 100;
      let newLevel = updatedUser.level;
      let newExp = updatedUser.exp;
      
      while (newExp >= expPerLevel) {
        newExp -= expPerLevel;
        newLevel += 1;
      }

      if (newLevel !== updatedUser.level) {
        await tx.user.update({
          where: { id: user.id },
          data: {
            level: newLevel,
            exp: newExp,
          },
        });
      }

      // 记录交易
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'harvest',
          amount: crop.sellPrice,
          description: `收获 ${crop.name}`,
        },
      });

      return { expGain, newLevel, leveledUp: newLevel > user.level };
    });

    return NextResponse.json({
      success: true,
      message: `成功收获 ${crop.name}！`,
      crop: {
        id: crop.id,
        name: crop.name,
        icon: crop.icon,
        sellPrice: crop.sellPrice,
      },
      expGain: result.expGain,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
    });
  } catch (error) {
    console.error('收获错误:', error);
    return NextResponse.json({ error: '收获失败，请稍后重试' }, { status: 500 });
  }
}
