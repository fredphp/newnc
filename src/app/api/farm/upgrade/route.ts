import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// 获取当前用户ID
async function getCurrentUserId(request: NextRequest): Promise<number | null> {
  // 从cookie获取用户ID
  const userIdCookie = request.cookies.get('userId');
  if (userIdCookie) {
    return parseInt(userIdCookie.value);
  }
  
  // 尝试从全局会话获取
  const globalThisAny = globalThis as any;
  if (globalThisAny.currentUserId) {
    return globalThisAny.currentUserId;
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });
    }

    const body = await request.json();
    const { type, level } = body;

    // 获取用户数据
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { userlist: true },
    });

    if (!user || !user.userlist) {
      return NextResponse.json({ success: false, message: '用户数据不存在' }, { status: 404 });
    }

    const userlist = user.userlist;

    if (type === 'house') {
      // 房屋升级
      const currentLevel = userlist.fangwu || 1;
      const costMuban = currentLevel * 30;
      const costShitou = currentLevel * 30;
      const costZs = currentLevel * 10;

      const muban = parseInt(String(userlist.muban || '0'));
      const shitou = parseInt(String(userlist.shitou || '0'));
      const zs = parseInt(String(userlist.zs || '0'));

      if (muban < costMuban || shitou < costShitou || zs < costZs) {
        return NextResponse.json({ 
          success: false, 
          message: '材料不足，无法升级！' 
        });
      }

      // 更新用户数据
      await db.userlist.update({
        where: { id: userlist.id },
        data: {
          fangwu: currentLevel + 1,
          muban: String(muban - costMuban),
          shitou: String(shitou - costShitou),
          zs: String(zs - costZs),
        },
      });

      // 开通下一块土地
      const nextLandIndex = getNextLockedLand(userlist);
      if (nextLandIndex) {
        await db.userlist.update({
          where: { id: userlist.id },
          data: {
            [`tudi${nextLandIndex}`]: 1,
            [`zt${nextLandIndex}`]: '0',
          },
        });
      }

      return NextResponse.json({ 
        success: true, 
        message: '房屋升级成功！',
        newLevel: currentLevel + 1,
      });

    } else if (type === 'land') {
      // 土地升级
      const targetLevel = level || 1;
      
      // 找到第一个可以升级的土地
      const landIndex = getNextLandToUpgrade(userlist, targetLevel);
      if (!landIndex) {
        return NextResponse.json({ 
          success: false, 
          message: '没有可以升级的土地' 
        });
      }

      const costMultiplier = (userlist.lvl || 1) * 100;
      const shiliu = parseInt(String(userlist.shiliu || '0'));
      const hetao = parseInt(String(userlist.hetao || '0'));
      const zs = parseInt(String(userlist.zs || '0'));

      if (shiliu < costMultiplier || hetao < costMultiplier || zs < costMultiplier) {
        return NextResponse.json({ 
          success: false, 
          message: '材料不足，无法升级！' 
        });
      }

      // 更新土地等级
      await db.userlist.update({
        where: { id: userlist.id },
        data: {
          [`tudi${landIndex}`]: targetLevel,
          shiliu: String(shiliu - costMultiplier),
          hetao: String(hetao - costMultiplier),
          zs: String(zs - costMultiplier),
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: '土地升级成功！',
        landIndex,
        newLevel: targetLevel,
      });

    } else {
      return NextResponse.json({ success: false, message: '无效的操作类型' }, { status: 400 });
    }

  } catch (error) {
    console.error('升级失败:', error);
    return NextResponse.json({ 
      success: false, 
      message: '升级失败，请重试' 
    }, { status: 500 });
  }
}

// 获取下一个未开垦的土地编号
function getNextLockedLand(userlist: any): number | null {
  for (let i = 1; i <= 12; i++) {
    const tudi = userlist[`tudi${i}`];
    const zt = userlist[`zt${i}`];
    if (tudi === 0 || zt === '-1') {
      return i;
    }
  }
  return null;
}

// 获取下一个可以升级的土地
function getNextLandToUpgrade(userlist: any, targetLevel: number): number | null {
  for (let i = 1; i <= 12; i++) {
    const tudi = userlist[`tudi${i}`];
    const zt = userlist[`zt${i}`];
    // 已开垦但等级低于目标等级的土地
    if (tudi > 0 && zt !== '-1' && tudi < targetLevel) {
      return i;
    }
  }
  return null;
}
