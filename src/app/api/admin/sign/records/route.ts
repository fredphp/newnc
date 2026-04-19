import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// 获取签到记录列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const username = searchParams.get('username') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    const where: any = {};
    
    if (username) {
      where.username = { contains: username };
    }
    
    if (startDate || endDate) {
      where.time = {};
      if (startDate) {
        where.time.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.time.lte = end;
      }
    }

    // 获取总数
    const total = await db.signRecord.count({ where });

    // 获取列表
    const records = await db.signRecord.findMany({
      where,
      orderBy: { time: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // 获取统计信息
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaySignCount = await db.signRecord.count({
      where: {
        time: {
          gte: today,
        },
      },
    });

    // 获取本周签到人数
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    
    const weekSignCount = await db.signRecord.count({
      where: {
        time: {
          gte: weekStart,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        list: records,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
        stats: {
          todaySignCount,
          weekSignCount,
          totalSignCount: total,
        },
      },
    });

  } catch (error) {
    console.error('获取签到记录失败:', error);
    return NextResponse.json({
      success: false,
      message: '获取签到记录失败',
    }, { status: 500 });
  }
}
