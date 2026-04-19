// 全局验证码存储（单例模式）
// 在 Next.js 开发模式下，模块可能会被重新加载，使用 globalThis 来保持状态

interface VcodeData {
  code: string;
  expiresAt: number;
}

// 使用 globalThis 来确保热重载时状态不丢失
const globalForVcode = globalThis as unknown as {
  vcodeStore: Map<string, VcodeData> | undefined;
};

export const vcodeStore = globalForVcode.vcodeStore || new Map<string, VcodeData>();

if (!globalForVcode.vcodeStore) {
  globalForVcode.vcodeStore = vcodeStore;
}

// 验证验证码
export function verifyVcode(vcodeId: string, code: string): boolean {
  const stored = vcodeStore.get(vcodeId);
  
  if (!stored) {
    console.log('验证码不存在:', vcodeId);
    return false;
  }
  
  if (stored.expiresAt < Date.now()) {
    vcodeStore.delete(vcodeId);
    console.log('验证码已过期:', vcodeId);
    return false;
  }

  const isValid = stored.code === code;
  console.log('验证码验证:', { vcodeId, inputCode: code, storedCode: stored.code, isValid });
  
  if (isValid) {
    vcodeStore.delete(vcodeId); // 验证后删除
  }
  
  return isValid;
}

// 存储验证码
export function storeVcode(vcodeId: string, code: string, expiresInMs: number = 5 * 60 * 1000): void {
  vcodeStore.set(vcodeId, {
    code,
    expiresAt: Date.now() + expiresInMs,
  });
  console.log('存储验证码:', { vcodeId, code, expiresIn: expiresInMs / 1000 + 's' });
}

// 清理过期验证码
export function cleanExpiredVcodes(): void {
  const now = Date.now();
  for (const [key, value] of vcodeStore.entries()) {
    if (value.expiresAt < now) {
      vcodeStore.delete(key);
    }
  }
}
