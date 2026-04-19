'use client';

import { useMemo } from 'react';
import { useFarmStore } from '@/store/farmStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LogOut, Coins, Star, ShoppingCart, Package, Wheat } from 'lucide-react';
import { toast } from 'sonner';

export function Header() {
  const { user, currentView, setCurrentView, reset } = useFarmStore();
  
  // 使用 useMemo 计算经验进度
  const expProgress = useMemo(() => {
    if (user) {
      const expPerLevel = 100;
      return (user.exp / expPerLevel) * 100;
    }
    return 0;
  }, [user?.exp]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      reset();
      toast.success('已退出登录');
    } catch {
      toast.error('退出失败');
    }
  };

  if (!user) return null;

  const navItems = [
    { id: 'farm' as const, icon: Wheat, label: '农场', emoji: '🌾' },
    { id: 'shop' as const, icon: ShoppingCart, label: '商店', emoji: '🏪' },
    { id: 'inventory' as const, icon: Package, label: '背包', emoji: '🎒' },
  ];

  return (
    <header className="farm-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-3xl sm:text-4xl">🌾</div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-green-800">开心农场</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{user.nickname || user.username} 的农场</p>
            </div>
          </div>

          {/* 用户信息 */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* 金币 */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200">
              <Coins className="w-4 h-4 text-yellow-600" />
              <span className="font-bold text-yellow-700 text-sm sm:text-base">{user.coins}</span>
            </div>

            {/* 等级和经验 */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-blue-700">Lv.{user.level}</span>
              </div>
              <div className="w-24">
                <Progress value={expProgress} className="h-2" />
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    px-3 py-1.5 rounded-lg transition-all duration-300
                    ${currentView === item.id 
                      ? 'bg-white shadow-md text-green-700' 
                      : 'text-gray-600 hover:bg-white/50'}
                  `}
                >
                  <span className="text-lg mr-1 hidden sm:inline">{item.emoji}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
            </div>

            {/* 退出按钮 */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="rounded-full w-9 h-9 p-0 text-gray-500 hover:text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
