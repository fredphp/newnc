import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createSession, getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: '请输入用户名和密码' }, { status: 400 });
    }

    // 查找用户
    const user = await db.user.findFirst({
      where: { 
        OR: [
          { username: username },
          { phone: username }
        ]
      },
    });

    if (!user) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    // 验证密码（原项目使用明文密码比较）
    if (user.password !== password) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    // 检查用户状态
    if (user.status !== 1) {
      return NextResponse.json({ error: '账号已被锁定' }, { status: 403 });
    }

    // 更新登录信息
    await db.user.update({
      where: { id: user.id },
      data: {
        logtime: new Date(),
        lognum: (user.lognum || 0) + 1,
        logip: req.headers.get('x-forwarded-for') || 'unknown',
      },
    });

    // 创建会话
    await createSession(user.id);

    // 获取完整用户信息
    const fullUser = await getCurrentUser();

    return NextResponse.json({ 
      success: true, 
      user: fullUser 
    });
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500 });
  }
}
