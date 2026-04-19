import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('session_token');
    
    return NextResponse.json({
      success: true,
      message: '退出成功'
    });
  } catch (error) {
    console.error('退出登录错误:', error);
    return NextResponse.json({
      success: false,
      message: '服务器错误'
    });
  }
}
