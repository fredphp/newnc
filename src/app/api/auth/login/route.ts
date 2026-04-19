import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { verifyVcode } from '@/lib/vcode-store';
import { setSession, getSession, hasSession, deleteSession } from '@/lib/session-store';

// 密码加密函数 - 匹配原项目 MD5(password + password)
function encryptPassword(password: string): string {
  const combined = password + password;
  return crypto.createHash('md5').update(combined).digest('hex');
}

// 生成会话 token
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
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

    // 验证验证码
    const cookieStore = await cookies();
    const vcodeId = cookieStore.get('vcode_id')?.value;
    
    console.log('登录验证码检查:', { vcodeId, vcode, hasVcodeId: !!vcodeId });
    
    if (!vcodeId) {
      return NextResponse.json({
        success: false,
        message: '请先获取验证码'
      });
    }
    
    if (!vcode) {
      return NextResponse.json({
        success: false,
        message: '请输入验证码'
      });
    }
    
    if (!verifyVcode(vcodeId, vcode)) {
      return NextResponse.json({
        success: false,
        message: '验证码错误或已过期'
      });
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
    setSession(token, user.id, user.username || loginName);

    // 更新用户登录信息
    try {
      await db.user.update({
        where: { id: user.id },
        data: {
          logtime: new Date(),
          lognum: (user.lognum || 0) + 1,
          logip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
        }
      });
    } catch (updateError) {
      console.error('更新用户登录信息失败:', updateError);
      // 不影响登录流程
    }

    // 设置 cookie
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: '/',
    });

    console.log('登录成功:', { userId: user.id, username: user.username });

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

    console.log('GET 会话检查:', { hasToken: !!token });

    if (!token || !hasSession(token)) {
      console.log('会话无效或已过期');
      return NextResponse.json({
        success: false,
        message: '未登录'
      });
    }

    const session = getSession(token)!;
    
    console.log('找到会话:', { userId: session.userId, username: session.username });
    
    // 获取用户详细信息
    const user = await db.user.findUnique({
      where: { id: session.userId }
    });

    if (!user) {
      console.log('用户不存在:', session.userId);
      deleteSession(token);
      return NextResponse.json({
        success: false,
        message: '用户不存在'
      });
    }

    // 获取用户游戏数据
    let userlist = null;
    try {
      const userListData = await db.userlist.findUnique({
        where: { userid: user.id }
      });
      userlist = userListData;
    } catch (e) {
      console.error('获取 userlist 失败:', e);
    }

    console.log('返回用户数据:', { 
      id: user.id, 
      username: user.username, 
      hasUserlist: !!userlist 
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        userlist: userlist
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
