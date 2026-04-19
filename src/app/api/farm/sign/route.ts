import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session-store';

// 获取当前用户ID
async function getCurrentUserId(request: NextRequest): Promise<number | null> {
  const sessionToken = request.cookies.get('session_token');
  if (sessionToken) {
    const session = getSession(sessionToken.value);
    if (session) {
      return session.userId;
    }
  }
  return null;
}

// 默认签到奖励配置 - 只有金币
const DEFAULT_SIGN_REWARDS = [
  { day: 1, gold: 100, diamond: 0 },
  { day: 2, gold: 120, diamond: 0 },
  { day: 3, gold: 140, diamond: 0 },
  { day: 4, gold: 160, diamond: 0 },
  { day: 5, gold: 180, diamond: 0 },
  { day: 6, gold: 200, diamond: 0 },
  { day: 7, gold: 300, diamond: 0 },
];

// 获取签到奖励配置
async function getSignRewards() {
  try {
    const config = await db.sys.findFirst({
      where: { name: 'sign_rewards' },
    });

    if (config && config.value) {
      return JSON.parse(config.value);
    }
  } catch (e) {
    console.error('获取签到配置失败，使用默认配置');
  }
  return DEFAULT_SIGN_REWARDS;
}

// 获取签到状态
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request);
    console.log('签到API - 用户ID:', userId);
    
    if (!userId) {
      console.log('签到API - 用户未登录');
      return NextResponse.json({ success: false, message: '请先登录', needLogin: true }, { status: 401 });
    }

    // 获取用户数据
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { userlist: true },
    });

    console.log('签到API - 用户数据:', { hasUser: !!user, hasUserlist: !!user?.userlist });

    if (!user) {
      return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
    }
    
    if (!user.userlist) {
      // 如果用户没有游戏数据，返回默认数据而不是错误
      console.log('签到API - 用户无游戏数据，返回默认值');
      const SIGN_REWARDS = await getSignRewards();
      const calendar = SIGN_REWARDS.map((r: any, index: number) => ({
        day: r.day,
        date: new Date().getDate() - (6 - index),
        gold: r.gold,
        diamond: r.diamond,
        signed: false,
        isToday: index === 6,
      }));
      
      return NextResponse.json({
        success: true,
        data: {
          hasSignedToday: false,
          continuousDays: 0,
          nextReward: SIGN_REWARDS[0],
          calendar,
          totalGold: 0,
          totalDiamond: 0,
        },
      });
    }

    // 获取签到奖励配置
    const SIGN_REWARDS = await getSignRewards();

    const userlist = user.userlist;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // 获取上次签到时间
    const lastSignTime = userlist.sign_time;
    let hasSignedToday = false;
    let continuousDays = userlist.sign || 0;
    
    if (lastSignTime) {
      const lastSignDate = new Date(lastSignTime);
      const lastSignDay = new Date(lastSignDate.getFullYear(), lastSignDate.getMonth(), lastSignDate.getDate());
      
      if (lastSignDay.getTime() === today.getTime()) {
        hasSignedToday = true;
      } else {
        // 检查是否连续签到（昨天签到的）
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastSignDay.getTime() !== yesterday.getTime()) {
          // 不是连续签到，重置为0
          continuousDays = 0;
        }
      }
    }

    // 获取本周签到记录
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - today.getDay() + 1); // 周一
    
    const signRecords = await db.signRecord.findMany({
      where: {
        userid: userId,
        time: {
          gte: weekStart,
        },
      },
      orderBy: { time: 'asc' },
    });

    // 构建签到日历 (最近7天) - 只有金币奖励
    const calendar = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(today);
      dayDate.setDate(dayDate.getDate() - (6 - i));
      const dayNum = i + 1; // 1-7
      
      const reward = SIGN_REWARDS.find((r: any) => r.day === dayNum) || SIGN_REWARDS[0];
      const signed = signRecords.some(r => {
        const recordDate = new Date(r.time!);
        return recordDate.toDateString() === dayDate.toDateString();
      });
      
      calendar.push({
        day: dayNum,
        date: dayDate.getDate(),
        gold: reward.gold,
        signed,
        isToday: dayDate.toDateString() === today.toDateString(),
      });
    }

    // 计算下次签到的奖励
    const nextDay = (continuousDays % 7) + 1;
    const nextReward = SIGN_REWARDS.find((r: any) => r.day === nextDay) || SIGN_REWARDS[0];

    return NextResponse.json({
      success: true,
      data: {
        hasSignedToday,
        continuousDays,
        nextReward,
        calendar,
        totalGold: parseInt(userlist.gold || '0'),
        totalDiamond: parseInt(userlist.zs || '0'),
      },
    });

  } catch (error) {
    console.error('获取签到状态失败:', error);
    return NextResponse.json({ 
      success: false, 
      message: '获取签到状态失败: ' + (error instanceof Error ? error.message : '未知错误')
    }, { status: 500 });
  }
}

// 执行签到
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request);
    console.log('签到POST - 用户ID:', userId);
    
    if (!userId) {
      return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });
    }

    // 获取用户数据
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { userlist: true },
    });

    console.log('签到POST - 用户数据:', { hasUser: !!user, hasUserlist: !!user?.userlist });

    if (!user || !user.userlist) {
      return NextResponse.json({ success: false, message: '用户数据不存在' }, { status: 404 });
    }

    // 获取签到奖励配置
    const SIGN_REWARDS = await getSignRewards();
    console.log('签到POST - 奖励配置:', SIGN_REWARDS);

    const userlist = user.userlist;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // 检查今天是否已签到
    const lastSignTime = userlist.sign_time;
    if (lastSignTime) {
      const lastSignDate = new Date(lastSignTime);
      const lastSignDay = new Date(lastSignDate.getFullYear(), lastSignDate.getMonth(), lastSignDate.getDate());
      
      if (lastSignDay.getTime() === today.getTime()) {
        return NextResponse.json({ 
          success: false, 
          message: '今天已经签到过了' 
        });
      }
    }

    // 计算连续签到天数
    let continuousDays = userlist.sign || 0;
    
    if (lastSignTime) {
      const lastSignDate = new Date(lastSignTime);
      const lastSignDay = new Date(lastSignDate.getFullYear(), lastSignDate.getMonth(), lastSignDate.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastSignDay.getTime() === yesterday.getTime()) {
        // 连续签到
        continuousDays++;
      } else {
        // 中断了，重新开始
        continuousDays = 1;
      }
    } else {
      // 首次签到
      continuousDays = 1;
    }

    // 计算奖励（第7天后循环）
    const rewardDay = ((continuousDays - 1) % 7) + 1;
    const reward = SIGN_REWARDS.find((r: any) => r.day === rewardDay) || SIGN_REWARDS[0];
    
    // 确保 reward 有 gold 和 diamond 字段
    const goldReward = reward.gold || 100;
    const diamondReward = reward.diamond || 0;
    
    console.log('签到POST - 计算奖励:', { continuousDays, rewardDay, goldReward, diamondReward });

    // 更新用户数据
    const currentGold = parseInt(userlist.gold || '0');
    const currentDiamond = parseInt(userlist.zs || '0');
    const newGold = currentGold + goldReward;
    const newDiamond = currentDiamond + diamondReward;
    
    console.log('签到POST - 更新数据:', { currentGold, newGold, currentDiamond, newDiamond });
    
    await db.userlist.update({
      where: { id: userlist.id },
      data: {
        sign: continuousDays,
        sign_time: now,
        gold: String(newGold),
        zs: String(newDiamond),
      },
    });

    // 记录签到日志
    try {
      await db.signRecord.create({
        data: {
          userid: userId,
          username: user.username,
          time: now,
          type: 1,
        },
      });
    } catch (e) {
      console.error('记录签到日志失败:', e);
    }

    // 同时记录到用户日志
    try {
      await db.userLog.create({
        data: {
          userid: userId,
          username: user.username,
          time: Math.floor(Date.now() / 1000),
          record: `签到成功，获得${goldReward}金币`,
          score: goldReward,
          source: 0,
        },
      });
    } catch (e) {
      console.error('记录用户日志失败:', e);
    }

    console.log(`用户 ${user.username} 签到成功，连续 ${continuousDays} 天，获得 ${goldReward} 金币`);

    return NextResponse.json({
      success: true,
      message: '签到成功！',
      data: {
        continuousDays,
        rewardDay,
        gold: goldReward,
        diamond: diamondReward,
        totalGold: newGold,
        totalDiamond: newDiamond,
      },
    });

  } catch (error) {
    console.error('签到失败:', error);
    return NextResponse.json({ 
      success: false, 
      message: '签到失败: ' + (error instanceof Error ? error.message : '未知错误')
    }, { status: 500 });
  }
}
