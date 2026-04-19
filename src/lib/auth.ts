import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 简单的密码哈希（生产环境应使用 bcrypt）
export function hashPassword(password: string): string {
  // 简单哈希，仅用于演示
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// 验证密码
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// 生成会话令牌
export function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// 会话存储（生产环境应使用 Redis）
const sessions = new Map<string, { userId: string; expiresAt: number }>();

// 创建会话
export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24小时过期
  sessions.set(token, { userId, expiresAt });
  
  (await cookies()).set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24小时
  });
  
  return token;
}

// 获取当前用户
export async function getCurrentUser(): Promise<{ id: string; username: string; nickname: string | null; coins: number; exp: number; level: number; avatar: string | null } | null> {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) return null;

  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, nickname: true, coins: true, exp: true, level: true, avatar: true },
  });

  return user;
}

// 登出
export async function logout(): Promise<void> {
  const token = (await cookies()).get('session_token')?.value;
  if (token) {
    sessions.delete(token);
  }
  (await cookies()).delete('session_token');
}

// 需要认证的 API 包装器
export function withAuth(
  handler: (req: NextRequest, user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }
    return handler(req, user);
  };
}
