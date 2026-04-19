import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 会话存储（生产环境应使用 Redis）
const sessions = new Map<string, { userId: number; expiresAt: number }>();

// 生成会话令牌
export function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// 创建会话
export async function createSession(userId: number): Promise<string> {
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
export async function getCurrentUser() {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) return null;

  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }

  // 获取用户基本信息
  const user = await db.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) return null;

  // 获取用户游戏数据
  const userlist = await db.userlist.findUnique({
    where: { userid: session.userId },
  });

  return {
    id: user.id,
    username: user.username || '',
    nickname: user.nickname || user.username || '',
    phone: user.phone,
    status: user.status || 1,
    // 游戏数据
    gameData: userlist ? {
      zhongzi: userlist.zhongzi,
      gold: userlist.gold,
      rmb: userlist.rmb,
      lvl: userlist.lvl,
      zs: userlist.zs,
      // 土地状态
      lands: [
        userlist.zt1, userlist.zt2, userlist.zt3, userlist.zt4,
        userlist.zt5, userlist.zt6, userlist.zt7, userlist.zt8,
        userlist.zt9, userlist.zt10, userlist.zt11, userlist.zt12
      ],
      // 土地种植时间
      landTimes: [
        userlist.kttime1, userlist.kttime2, userlist.kttime3, userlist.kttime4,
        userlist.kttime5, userlist.kttime6, userlist.kttime7, userlist.kttime8,
        userlist.kttime9, userlist.kttime10, userlist.kttime11, userlist.kttime12
      ],
      // 作物库存
      crops: {
        hetao: userlist.hetao,
        hongzao: userlist.hongzao,
        putao: userlist.putao,
        hamigua: userlist.hamigua,
        shamoguo: userlist.shamoguo,
        shiliu: userlist.shiliu,
        xiangli: userlist.xiangli,
        rensheuguo: userlist.rensheuguo,
      }
    } : null
  };
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
