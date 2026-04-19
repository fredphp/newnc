import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { landIndex, cropId } = body;

    if (landIndex === undefined || !cropId) {
      return NextResponse.json({
        success: false,
        message: '参数错误'
      });
    }

    // 获取用户（简化处理）
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
    const ztField = `zt${landIndex + 1}` as keyof typeof userlist;
    const kttimeField = `kttime${landIndex + 1}` as keyof typeof userlist;

    // 检查土地是否已开垦
    if (userlist[landField] !== 1) {
      return NextResponse.json({
        success: false,
        message: '请先开垦土地'
      });
    }

    // 检查土地上是否已有作物
    if (userlist[ztField] && userlist[ztField] !== '-1' && userlist[ztField] !== '0') {
      return NextResponse.json({
        success: false,
        message: '该土地上已有作物'
      });
    }

    // 检查种子数量
    const seedCount = userlist.zhongzi || 0;
    if (seedCount < 1) {
      return NextResponse.json({
        success: false,
        message: '种子不足，请购买种子'
      });
    }

    // 更新数据库
    const updateData: any = {};
    updateData[ztField] = String(cropId);
    updateData[kttimeField] = new Date();
    updateData.zhongzi = seedCount - 1;

    await db.userlist.update({
      where: { userid: user.id },
      data: updateData
    });

    // 获取更新后的用户数据
    const updatedUser = await db.user.findUnique({
      where: { id: user.id },
      include: { userlist: true }
    });

    return NextResponse.json({
      success: true,
      message: '种植成功',
      user: {
        ...updatedUser,
        userlist: updatedUser?.userlist
      }
    });
  } catch (error) {
    console.error('种植错误:', error);
    return NextResponse.json({
      success: false,
      message: '服务器错误'
    });
  }
}
