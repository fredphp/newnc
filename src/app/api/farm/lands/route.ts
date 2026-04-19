import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 作物生长时间配置（秒）
const CROP_GROWTH_TIME: Record<string, number> = {
  '1': 3600,    // 核桃 - 1小时
  '2': 3600,    // 石榴 - 1小时
  '3': 2700,    // 红枣 - 45分钟
  '4': 2700,    // 葡萄 - 45分钟
  '5': 1800,    // 哈密瓜 - 30分钟
  '6': 1800,    // 香梨 - 30分钟
  '7': 1200,    // 沙漠果 - 20分钟
  '8': 1200,    // 人参果 - 20分钟
  '9': 1200,    // 薰衣草 - 20分钟
  '10': 900,    // 沙漠人参 - 15分钟
  '11': 600,    // 巴旦木 - 10分钟
  '12': 300,    // 和田玉 - 5分钟
};

// 作物名称映射
const CROP_NAMES: Record<string, string> = {
  '1': '核桃',
  '2': '石榴',
  '3': '红枣',
  '4': '葡萄',
  '5': '哈密瓜',
  '6': '香梨',
  '7': '沙漠果',
  '8': '人参果',
  '9': '薰衣草',
  '10': '沙漠人参',
  '11': '巴旦木',
  '12': '和田玉',
};

// 作物图标映射
const CROP_ICONS: Record<string, string> = {
  '1': '🌰',
  '2': '🫐',
  '3': '🔴',
  '4': '🍇',
  '5': '🍈',
  '6': '🍐',
  '7': '🥜',
  '8': '🥝',
  '9': '💜',
  '10': '🥕',
  '11': '🥜',
  '12': '💎',
};

// 计算作物状态
export function calculateCropStatus(
  plantedAt: Date | null,
  cropId: string
): { stage: number; progress: number; isReady: boolean; remainingTime: number; cropName: string; cropIcon: string } {
  if (!plantedAt) {
    return { stage: 0, progress: 0, isReady: false, remainingTime: 0, cropName: '', cropIcon: '' };
  }

  const growthTime = CROP_GROWTH_TIME[cropId] || 3600; // 默认1小时
  const now = Date.now();
  const plantedTime = new Date(plantedAt).getTime();
  const elapsed = now - plantedTime;
  const progress = Math.min(100, (elapsed / (growthTime * 1000)) * 100);
  
  const stage = Math.min(4, Math.floor(progress / 25) + 1);
  const isReady = progress >= 100;
  const remainingTime = Math.max(0, Math.ceil((growthTime * 1000 - elapsed) / 1000));

  return { 
    stage, 
    progress: Math.round(progress * 10) / 10, 
    isReady, 
    remainingTime,
    cropName: CROP_NAMES[cropId] || '未知',
    cropIcon: CROP_ICONS[cropId] || '🌱'
  };
}

// 获取农场状态
export async function GET() {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  // 获取用户游戏数据
  const userlist = await db.userlist.findUnique({
    where: { userid: user.id },
  });

  if (!userlist) {
    return NextResponse.json({ error: '用户数据不存在' }, { status: 404 });
  }

  // 构建土地数据
  const landStatuses = [
    userlist.zt1, userlist.zt2, userlist.zt3, userlist.zt4,
    userlist.zt5, userlist.zt6, userlist.zt7, userlist.zt8,
    userlist.zt9, userlist.zt10, userlist.zt11, userlist.zt12
  ];

  const landTimes = [
    userlist.kttime1, userlist.kttime2, userlist.kttime3, userlist.kttime4,
    userlist.kttime5, userlist.kttime6, userlist.kttime7, userlist.kttime8,
    userlist.kttime9, userlist.kttime10, userlist.kttime11, userlist.kttime12
  ];

  const lands = landStatuses.map((status, index) => {
    const position = index + 1;
    const isUnlocked = status !== '-1';
    const isEmpty = status === '0';
    const cropId = status !== '-1' && status !== '0' ? status : null;
    const plantedAt = landTimes[index];

    let cropStatus = null;
    if (cropId) {
      cropStatus = calculateCropStatus(plantedAt, cropId);
    }

    return {
      position,
      status,
      isUnlocked,
      isEmpty,
      cropId,
      plantedAt,
      cropStatus,
    };
  });

  // 获取作物列表
  const crops = await db.cropsList.findMany({
    orderBy: { id: 'asc' },
  });

  // 构建种子数据（用户拥有的种子）
  const seeds = [{
    id: 'seed_all',
    name: '通用种子',
    quantity: userlist.zhongzi,
  }];

  return NextResponse.json({
    lands,
    seeds,
    crops: crops.map(crop => ({
      id: crop.id,
      name: crop.crops_name,
      identifier: crop.crops_identifier,
      harvestTime: crop.crops_harvest,
      seedPrice: crop.crops_seed,
      englishName: crop.name,
    })),
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      gold: userlist.gold,
      rmb: userlist.rmb,
      lvl: userlist.lvl,
      zhongzi: userlist.zhongzi,
      crops: {
        hetao: userlist.hetao,
        hongzao: userlist.hongzao,
        putao: userlist.putao,
        hamigua: userlist.hamigua,
        shamoguo: userlist.shamoguo,
        shiliu: userlist.shiliu,
        xiangli: userlist.xiangli,
        rensheuguo: userlist.rensheuguo,
      }
    },
  });
}
