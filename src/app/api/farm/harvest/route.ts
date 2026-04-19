import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { landIndex } = body;

    if (landIndex === undefined) {
      return NextResponse.json({
        success: false,
        message: '参数错误'
      });
    }

    // 获取用户
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
    const ztField = `zt${landIndex + 1}` as keyof typeof userlist;
    const kttimeField = `kttime${landIndex + 1}` as keyof typeof userlist;
    
    // 获取作物ID
    const cropId = userlist[ztField];
    if (!cropId || cropId === '-1' || cropId === '0') {
      return NextResponse.json({
        success: false,
        message: '该土地上没有作物'
      });
    }

    // 作物名称映射
    const cropFieldMap: Record<string, string> = {
      '1': 'hetao',
      '2': 'shiliu',
      '3': 'hongzao',
      '4': 'putao',
      '5': 'hamigua',
      '6': 'xiangli',
      '7': 'shamoguo',
      '8': 'rensheuguo',
      '9': 'xunyichao',
      '10': 'shamorenshen',
      '11': 'badanmu',
      '12': 'hetianyu'
    };

    const cropField = cropFieldMap[String(cropId)];
    if (!cropField) {
      return NextResponse.json({
        success: false,
        message: '未知作物'
      });
    }

    // 计算收获数量（随机1-5个）
    const fruitCount = Math.floor(Math.random() * 5) + 1;

    // 更新数据库
    const updateData: any = {};
    updateData[ztField] = '0';
    updateData[kttimeField] = null;
    
    // 更新果实数量
    const currentFruitCount = parseInt(String(userlist[cropField as keyof typeof userlist] || '0'));
    updateData[cropField] = String(currentFruitCount + fruitCount);

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
      message: '收获成功',
      fruitCount,
      cropField,
      user: {
        ...updatedUser,
        userlist: updatedUser?.userlist
      }
    });
  } catch (error) {
    console.error('收获错误:', error);
    return NextResponse.json({
      success: false,
      message: '服务器错误'
    });
  }
}
