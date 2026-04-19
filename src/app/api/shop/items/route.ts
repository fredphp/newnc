import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// 获取商店商品列表
export async function GET() {
  const user = await getCurrentUser();
  
  // 获取所有活跃的商店商品
  const shopItems = await db.shopItem.findMany({
    where: { isActive: true },
    orderBy: [{ minLevel: 'asc' }, { price: 'asc' }],
  });

  // 获取每个商品的详情
  const itemsWithDetails = await Promise.all(
    shopItems.map(async (item) => {
      let detail = null;
      
      if (item.type === 'seed') {
        detail = await db.cropTemplate.findUnique({
          where: { id: item.itemId },
        });
      }

      return {
        ...item,
        detail,
        canBuy: user ? user.level >= item.minLevel : false,
        isLocked: user ? user.level < item.minLevel : true,
      };
    })
  );

  return NextResponse.json({
    items: itemsWithDetails,
    user: user ? { level: user.level, coins: user.coins } : null,
  });
}
