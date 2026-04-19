// 全局会话存储
// 在开发模式下，模块会被重新加载，所以需要使用 globalThis 来保持会话

interface Session {
  userId: number;
  username: string;
  createdAt: number;
}

// 使用 globalThis 来存储会话，避免热重载时丢失
const globalForSessions = globalThis as unknown as {
  sessions: Map<string, Session> | undefined;
};

export const sessions = globalForSessions.sessions ?? new Map<string, Session>();

if (!globalForSessions.sessions) {
  globalForSessions.sessions = sessions;
}

// 会话过期时间 (7天)
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000;

// 清理过期会话
export function cleanExpiredSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_EXPIRY) {
      sessions.delete(token);
    }
  }
}

// 添加会话
export function setSession(token: string, userId: number, username: string) {
  sessions.set(token, {
    userId,
    username,
    createdAt: Date.now()
  });
  console.log('会话已创建:', { token: token.substring(0, 8) + '...', userId, username, totalSessions: sessions.size });
}

// 获取会话
export function getSession(token: string): Session | undefined {
  const session = sessions.get(token);
  if (session) {
    // 检查是否过期
    if (Date.now() - session.createdAt > SESSION_EXPIRY) {
      sessions.delete(token);
      return undefined;
    }
  }
  return session;
}

// 删除会话
export function deleteSession(token: string) {
  sessions.delete(token);
}

// 检查会话是否存在
export function hasSession(token: string): boolean {
  return getSession(token) !== undefined;
}
