import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// 获取签到统计数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview'; // overview, daily, monthly

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (type === 'overview') {
      // 总览统计
      const totalSignCount = await db.signRecord.count();
      
      const todaySignCount = await db.signRecord.count({
        where: {
          time: { gte: today },
        },
      });

      // 本周统计
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
      const weekSignCount = await db.signRecord.count({
        where: {
          time: { gte: weekStart },
        },
      });

      // 本月统计
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthSignCount = await db.signRecord.count({
        where: {
          time: { gte: monthStart },
        },
      });

      // 连续签到排行
      const topContinuous = await db.userlist.findMany({
        where: {
          sign: { gt: 0 },
        },
        orderBy: { sign: 'desc' },
        take: 10,
        select: {
          userid: true,
          username: true,
          sign: true,
          sign_time: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          totalSignCount,
          todaySignCount,
          weekSignCount,
          monthSignCount,
          topContinuous,
        },
      });
    }

    if (type === 'daily') {
      // 最近7天每日签到统计
      const dailyStats = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        
        const count = await db.signRecord.count({
          where: {
            time: {
              gte: date,
              lt: nextDate,
            },
          },
        });
        
        dailyStats.push({
          date: date.toISOString().split('T')[0],
          count,
        });
      }

      return NextResponse.json({
        success: true,
        data: { dailyStats },
      });
    }

    if (type === 'monthly') {
      // 最近12个月每月签到统计
      const monthlyStats = [];
      
      for (let i = 11; i >= 0; i--) {
        const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
        
        const count = await db.signRecord.count({
          where: {
            time: {
              gte: monthStart,
              lt: monthEnd,
            },
          },
        });
        
        monthlyStats.push({
          month: `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, '0')}`,
          count,
        });
      }

      return NextResponse.json({
        success: true,
        data: { monthlyStats },
      });
    }

    return NextResponse.json({
      success: false,
      message: '无效的统计类型',
    }, { status: 400 });

  } catch (error) {
    console.error('获取签到统计失败:', error);
    return NextResponse.json({
      success: false,
      message: '获取签到统计失败',
    }, { status: 500 });
  }
}
