import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, nickname } = body;

    // 验证输入
    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json({ error: '用户名长度需在3-20个字符之间' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: '密码长度至少6个字符' }, { status: 400 });
    }

    // 检查用户是否已存在
    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ error: '用户名已存在' }, { status: 400 });
    }

    // 创建用户
    const hashedPassword = hashPassword(password);
    const user = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        nickname: nickname || username,
        coins: 1000,
        exp: 0,
        level: 1,
      },
    });

    // 为新用户创建初始土地（6块，前3块解锁）
    for (let i = 1; i <= 6; i++) {
      await db.land.create({
        data: {
          userId: user.id,
          position: i,
          isUnlocked: i <= 3,
          unlockPrice: i <= 3 ? 0 : 500 * (i - 2),
        },
      });
    }

    // 给新用户一些初始种子
    const crops = await db.cropTemplate.findMany({
      where: { minLevel: 1 },
      take: 2,
    });

    for (const crop of crops) {
      await db.inventory.create({
        data: {
          userId: user.id,
          itemType: 'seed',
          itemId: crop.id,
          quantity: 3,
        },
      });
    }

    // 创建会话
    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        coins: user.coins,
        exp: user.exp,
        level: user.level,
      },
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json({ error: '注册失败，请稍后重试' }, { status: 500 });
  }
}
