import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 作物状态计算
export function calculateCropStatus(
  plantedAt: Date,
  growthTime: number,
  stageCount: number,
  isHarvested: boolean
): { stage: number; progress: number; isReady: boolean; remainingTime: number } {
  if (isHarvested) {
    return { stage: stageCount, progress: 100, isReady: false, remainingTime: 0 };
  }

  const now = Date.now();
  const plantedTime = plantedAt.getTime();
  const elapsed = now - plantedTime;
  const progress = Math.min(100, (elapsed / (growthTime * 1000)) * 100);
  
  // 计算当前阶段（从1开始）
  const stage = Math.min(stageCount, Math.floor(progress / (100 / stageCount)) + 1);
  const isReady = progress >= 100;
  
  // 剩余时间（秒）
  const remainingTime = Math.max(0, Math.ceil((growthTime * 1000 - elapsed) / 1000));

  return { stage, progress: Math.round(progress * 10) / 10, isReady, remainingTime };
}

// 获取农场状态
export async function GET() {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  // 获取用户所有土地
  const lands = await db.land.findMany({
    where: { userId: user.id },
    orderBy: { position: 'asc' },
    include: {
      plantedCrop: {
        include: {
          crop: true,
        },
      },
    },
  });

  // 计算每块土地上的作物状态
  const landsWithStatus = lands.map((land) => {
    if (land.plantedCrop && !land.plantedCrop.isHarvested) {
      const status = calculateCropStatus(
        land.plantedCrop.plantedAt,
        land.plantedCrop.crop.growthTime,
        land.plantedCrop.crop.stageCount,
        land.plantedCrop.isHarvested
      );
      return {
        ...land,
        cropStatus: status,
      };
    }
    return {
      ...land,
      cropStatus: null,
    };
  });

  // 获取用户背包中的种子
  const seeds = await db.inventory.findMany({
    where: {
      userId: user.id,
      itemType: 'seed',
    },
    include: {
      // @ts-ignore - Prisma 动态关联
    },
  });

  // 获取种子详情
  const seedDetails = await Promise.all(
    seeds.map(async (seed) => {
      const crop = await db.cropTemplate.findUnique({
        where: { id: seed.itemId },
      });
      return {
        ...seed,
        crop,
      };
    })
  );

  return NextResponse.json({
    lands: landsWithStatus,
    seeds: seedDetails,
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      coins: user.coins,
      exp: user.exp,
      level: user.level,
    },
  });
}
