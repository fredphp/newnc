import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createSession, getCurrentUser } from '@/lib/auth';

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
    const existingUser = await db.user.findFirst({
      where: { 
        OR: [
          { username: username },
          { phone: username }
        ]
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: '用户名已存在' }, { status: 400 });
    }

    // 创建用户
    const user = await db.user.create({
      data: {
        username,
        password, // 原项目使用明文密码
        nickname: nickname || username,
        status: 1,
        regtime: new Date(),
        logtime: new Date(),
        lognum: 1,
      },
    });

    // 创建用户游戏数据
    await db.userlist.create({
      data: {
        userid: user.id!,
        username: user.username,
        zhongzi: 50,      // 初始种子
        gold: '10000',    // 初始金币
        rmb: '0',
        lvl: 1,
        zs: '0',
        // 前3块土地已开垦（状态为0表示空地）
        zt1: '0',
        zt2: '0',
        zt3: '0',
        zt4: '-1',
        zt5: '-1',
        zt6: '-1',
        zt7: '-1',
        zt8: '-1',
        zt9: '-1',
        zt10: '-1',
        zt11: '-1',
        zt12: '-1',
        // 作物库存
        hetao: '0',
        hongzao: '0',
        putao: '0',
        hamigua: '0',
        shamoguo: '0',
        shiliu: '0',
        xiangli: '0',
        rensheuguo: '0',
      },
    });

    // 创建会话
    await createSession(user.id!);

    // 获取完整用户信息
    const fullUser = await getCurrentUser();

    return NextResponse.json({
      success: true,
      user: fullUser,
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json({ error: '注册失败，请稍后重试' }, { status: 500 });
  }
}
