import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 获取用户背包
export async function GET() {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  // 获取用户背包所有物品
  const inventory = await db.inventory.findMany({
    where: { userId: user.id },
    orderBy: [{ itemType: 'asc' }, { createdAt: 'desc' }],
  });

  // 获取每个物品的详情
  const itemsWithDetails = await Promise.all(
    inventory.map(async (item) => {
      let detail = null;
      
      if (item.itemType === 'seed' || item.itemType === 'crop') {
        detail = await db.cropTemplate.findUnique({
          where: { id: item.itemId },
        });
      }

      return {
        ...item,
        detail,
      };
    })
  );

  // 按类型分组
  const grouped = {
    seeds: itemsWithDetails.filter(i => i.itemType === 'seed'),
    crops: itemsWithDetails.filter(i => i.itemType === 'crop'),
    tools: itemsWithDetails.filter(i => i.itemType === 'tool'),
  };

  return NextResponse.json({
    inventory: itemsWithDetails,
    grouped,
  });
}
