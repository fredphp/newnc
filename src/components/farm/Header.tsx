'use client';

import { useMemo } from 'react';
import { useFarmStore } from '@/store/farmStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌾</div>
            <div>
              <h1 className="text-xl font-bold text-green-800">开心农场</h1>
              <p className="text-xs text-gray-500">{user.nickname || user.username} 的农场</p>
            </div>
          </div>

          {/* 用户信息 */}
          <div className="flex items-center gap-4">
            {/* 金币 */}
            <Badge variant="secondary" className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-800">
              <Coins className="w-4 h-4 mr-1" />
              {user.coins}
            </Badge>

            {/* 等级和经验 */}
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800">
                <Star className="w-4 h-4 mr-1" />
                Lv.{user.level}
              </Badge>
              <div className="w-24">
                <Progress value={expProgress} className="h-2" />
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="flex items-center gap-1">
              <Button
                variant={currentView === 'farm' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('farm')}
                className={currentView === 'farm' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                <Wheat className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">农场</span>
              </Button>
              <Button
                variant={currentView === 'shop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('shop')}
                className={currentView === 'shop' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">商店</span>
              </Button>
              <Button
                variant={currentView === 'inventory' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('inventory')}
                className={currentView === 'inventory' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                <Package className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">背包</span>
              </Button>
            </div>

            {/* 退出按钮 */}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
