import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

// 密码加密函数
function encryptPassword(password: string): string {
  const combined = password + password;
  return crypto.createHash('md5').update(combined).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password, vcode, nickname } = body;

    // 验证必填字段
    if (!phone || !password) {
      return NextResponse.json({
        success: false,
        message: '请填写完整信息'
      });
    }

    // 验证手机号格式
    if (!/^1[0-9]{10}$/.test(phone)) {
      return NextResponse.json({
        success: false,
        message: '手机号格式错误'
      });
    }

    // 检查用户是否已存在
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { username: phone },
          { phone: phone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: '该手机号已注册'
      });
    }

    // 加密密码
    const encryptedPassword = encryptPassword(password);

    // 创建用户
    const user = await db.user.create({
      data: {
        username: phone,
        password: encryptedPassword,
        phone: phone,
        nickname: nickname || phone,
        regtime: new Date(),
        logtime: new Date(),
        lognum: 1,
        RegIP: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        status: 1
      }
    });

    // 创建用户游戏数据
    await db.userlist.create({
      data: {
        userid: user.id,
        username: phone,
        password: encryptedPassword,
        zhongzi: 10,  // 初始种子
        gold: '10000',  // 初始金币
        rmb: '0',
        lvl: 1,
        zs: '0',
        // 前4块土地已开垦
        tudi1: 1,
        tudi2: 1,
        tudi3: 1,
        tudi4: 1,
        // 锄头
        chutou: '10',
        logtime: new Date(),
        lognum: 1,
        islogin: '1',
        status: 1
      }
    });

    return NextResponse.json({
      success: true,
      message: '注册成功',
      userId: user.id
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json({
      success: false,
      message: '注册失败，请稍后重试'
    });
  }
}
