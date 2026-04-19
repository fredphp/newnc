import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// 简单的会话存储（生产环境应使用 Redis 等）
const sessions = new Map<string, { userId: number; username: string }>();

// 验证码存储（与 vcode API 共享）
const vcodeStore = new Map<string, { code: string; expiresAt: number }>();

// 密码加密函数 - 匹配原项目 MD5(password + password)
function encryptPassword(password: string): string {
  const combined = password + password;
  return crypto.createHash('md5').update(combined).digest('hex');
}

// 生成会话 token
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// 验证验证码
function verifyVcode(vcodeId: string, code: string): boolean {
  const stored = vcodeStore.get(vcodeId);
  if (!stored) return false;
  
  if (stored.expiresAt < Date.now()) {
    vcodeStore.delete(vcodeId);
    return false;
  }

  const isValid = stored.code === code;
  if (isValid) {
    vcodeStore.delete(vcodeId); // 验证后删除
  }
  
  return isValid;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password, vcode, username } = body;

    // 支持用户名或手机号登录
    const loginName = phone || username;

    // 验证输入
    if (!loginName || !password) {
      return NextResponse.json({
        success: false,
        message: '请输入用户名和密码'
      });
    }

    // 验证验证码（如果提供了的话）
    if (vcode) {
      const cookieStore = await cookies();
      const vcodeId = cookieStore.get('vcode_id')?.value;
      
      if (!vcodeId || !verifyVcode(vcodeId, vcode)) {
        return NextResponse.json({
          success: false,
          message: '验证码错误或已过期'
        });
      }
    }

    // 查找用户
    const user = await db.user.findFirst({
      where: {
        OR: [
          { username: loginName },
          { phone: loginName }
        ]
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: '用户不存在'
      });
    }

    // 验证密码 - 原项目使用简单密码比较或 MD5
    const encryptedPassword = encryptPassword(password);
    if (user.password !== password && user.password !== encryptedPassword) {
      return NextResponse.json({
        success: false,
        message: '密码错误'
      });
    }

    // 检查用户状态
    if (user.status !== 1) {
      return NextResponse.json({
        success: false,
        message: '账号已被禁用'
      });
    }

    // 创建会话
    const token = generateToken();
    sessions.set(token, { userId: user.id, username: user.username || loginName });

    // 更新用户登录信息
    await db.user.update({
      where: { id: user.id },
      data: {
        logtime: new Date(),
        lognum: (user.lognum || 0) + 1,
        logip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      }
    });

    // 设置 cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 天
    });

    return NextResponse.json({
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username || loginName,
        nickname: user.nickname
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json({
      success: false,
      message: '服务器错误，请稍后重试'
    });
  }
}

// 获取当前会话
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token || !sessions.has(token)) {
      return NextResponse.json({
        success: false,
        message: '未登录'
      });
    }

    const session = sessions.get(token)!;
    
    // 获取用户详细信息
    const user = await db.user.findUnique({
      where: { id: session.userId },
      include: { userlist: true }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: '用户不存在'
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        userlist: user.userlist
      }
    });
  } catch (error) {
    console.error('获取会话错误:', error);
    return NextResponse.json({
      success: false,
      message: '服务器错误'
    });
  }
}
