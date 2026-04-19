import { NextResponse } from 'next/server';
import { storeVcode, cleanExpiredVcodes } from '@/lib/vcode-store';

// 生成随机验证码
function generateCode(length: number = 4): string {
  const chars = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// 生成验证码 ID
function generateVcodeId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// 创建 SVG 验证码图片
function createVcodeImage(code: string): string {
  const width = 100;
  const height = 40;
  
  // 生成干扰线
  const lines = Array.from({ length: 5 }, () => {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    const color = `rgb(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)})`;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1"/>`;
  }).join('');

  // 生成干扰点
  const dots = Array.from({ length: 30 }, () => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const color = `rgb(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)})`;
    return `<circle cx="${x}" cy="${y}" r="1" fill="${color}"/>`;
  }).join('');

  // 生成验证码文字
  const chars = code.split('').map((char, i) => {
    const x = 15 + i * 22;
    const y = 25 + (Math.random() * 10 - 5);
    const rotate = (Math.random() * 30 - 15);
    const color = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
    return `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${color}" transform="rotate(${rotate}, ${x}, ${y})">${char}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="#f5f5dc"/>
    ${lines}
    ${dots}
    ${chars}
  </svg>`;
}

export async function GET() {
  try {
    // 生成验证码
    const code = generateCode(4);
    const vcodeId = generateVcodeId();
    
    // 存储验证码，5分钟过期
    storeVcode(vcodeId, code, 5 * 60 * 1000);

    // 清理过期验证码
    cleanExpiredVcodes();

    // 创建 SVG 图片
    const svg = createVcodeImage(code);

    // 返回图片，并设置 cookie 存储 vcodeId
    const response = new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

    // 设置验证码 ID cookie
    response.cookies.set('vcode_id', vcodeId, {
      httpOnly: true,
      secure: false, // 开发环境设为 false
      sameSite: 'lax',
      maxAge: 5 * 60, // 5分钟
      path: '/',
    });

    console.log('验证码已生成:', { vcodeId, code });

    return response;
  } catch (error) {
    console.error('生成验证码错误:', error);
    return new NextResponse('Error', { status: 500 });
  }
}
