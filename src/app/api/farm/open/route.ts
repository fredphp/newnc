import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// 开垦土地费用配置
const OPEN_LAND_COST: { [key: number]: number } = {
  4: 0,      // 第5块免费
  5: 5000,   // 第6块
  6: 10000,  // 第7块
  7: 20000,  // 第8块
  8: 50000,  // 第9块
  9: 100000, // 第10块
  10: 200000, // 第11块
  11: 500000, // 第12块
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { landIndex } = body;

    if (landIndex === undefined || landIndex < 0 || landIndex > 11) {
      return NextResponse.json({
        success: false,
        message: '土地索引无效'
      });
    }

    // 获取当前用户
    const cookieStore = request.cookies;
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({
        success: false,
        message: '请先登录'
      });
    }

    // 获取会话信息（简化处理）
    const user = await db.user.findFirst({
      where: { status: 1 },
      include: { userlist: true }
    });

    if (!user || !user.userlist) {
      return NextResponse.json({
        success: false,
        message: '用户不存在'
      });
    }

    const userlist = user.userlist;
    const landField = `tudi${landIndex + 1}` as keyof typeof userlist;
    
    // 检查土地是否已开垦
    if (userlist[landField] === 1) {
      return NextResponse.json({
        success: false,
        message: '该土地已开垦'
      });
    }

    // 检查前置土地是否已开垦
    if (landIndex > 0) {
      const prevLandField = `tudi${landIndex}` as keyof typeof userlist;
      if (userlist[prevLandField] !== 1) {
        return NextResponse.json({
          success: false,
          message: '请先开垦前面的土地'
        });
      }
    }

    // 计算开垦费用
    const cost = OPEN_LAND_COST[landIndex] || 0;
    const currentGold = parseInt(userlist.gold || '0');
    
    if (currentGold < cost) {
      return NextResponse.json({
        success: false,
        message: `金币不足，开垦需要 ${cost} 金币`
      });
    }

    // 更新数据库
    const updateData: any = {};
    updateData[landField] = 1;
    updateData.gold = String(currentGold - cost);

    const updatedUserlist = await db.userlist.update({
      where: { userid: user.id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: '开垦成功',
      user: {
        ...user,
        userlist: updatedUserlist
      }
    });
  } catch (error) {
    console.error('开垦错误:', error);
    return NextResponse.json({
      success: false,
      message: '服务器错误'
    });
  }
}
