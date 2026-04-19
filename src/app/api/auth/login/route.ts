import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // 验证输入
    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    // 查找用户
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    // 验证密码
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
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
    console.error('登录错误:', error);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500 });
  }
}
