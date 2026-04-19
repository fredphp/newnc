import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// 签到奖励默认配置
const DEFAULT_SIGN_CONFIG = [
  { day: 1, gold: 100, diamond: 0 },
  { day: 2, gold: 120, diamond: 0 },
  { day: 3, gold: 140, diamond: 0 },
  { day: 4, gold: 160, diamond: 0 },
  { day: 5, gold: 180, diamond: 0 },
  { day: 6, gold: 200, diamond: 0 },
  { day: 7, gold: 300, diamond: 1 },
];

// 获取签到配置
export async function GET() {
  try {
    // 尝试从数据库获取配置
    const config = await db.sys.findFirst({
      where: { name: 'sign_rewards' },
    });

    let rewards = DEFAULT_SIGN_CONFIG;
    
    if (config && config.value) {
      try {
        rewards = JSON.parse(config.value);
      } catch (e) {
        console.error('解析签到配置失败，使用默认配置');
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        rewards,
        description: '签到奖励配置，第7天后循环',
      },
    });

  } catch (error) {
    console.error('获取签到配置失败:', error);
    return NextResponse.json({
      success: false,
      message: '获取签到配置失败',
    }, { status: 500 });
  }
}

// 更新签到配置
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rewards } = body;

    if (!rewards || !Array.isArray(rewards)) {
      return NextResponse.json({
        success: false,
        message: '无效的配置数据',
      }, { status: 400 });
    }

    // 验证配置
    for (const reward of rewards) {
      if (typeof reward.day !== 'number' || reward.day < 1 || reward.day > 7) {
        return NextResponse.json({
          success: false,
          message: '签到天数必须在1-7之间',
        }, { status: 400 });
      }
      if (typeof reward.gold !== 'number' || reward.gold < 0) {
        return NextResponse.json({
          success: false,
          message: '金币奖励必须为非负数',
        }, { status: 400 });
      }
      if (typeof reward.diamond !== 'number' || reward.diamond < 0) {
        return NextResponse.json({
          success: false,
          message: '钻石奖励必须为非负数',
        }, { status: 400 });
      }
    }

    const configValue = JSON.stringify(rewards);

    // 检查是否已存在配置
    const existing = await db.sys.findFirst({
      where: { name: 'sign_rewards' },
    });

    if (existing) {
      await db.sys.update({
        where: { id: existing.id },
        data: { value: configValue },
      });
    } else {
      await db.sys.create({
        data: {
          name: 'sign_rewards',
          value: configValue,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: '签到配置更新成功',
      data: { rewards },
    });

  } catch (error) {
    console.error('更新签到配置失败:', error);
    return NextResponse.json({
      success: false,
      message: '更新签到配置失败',
    }, { status: 500 });
  }
}
