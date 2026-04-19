'use client';

import { useMemo } from 'react';
import { useFarmStore } from '@/store/farmStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LogOut, Coins, Star, ShoppingCart, Package, Wheat } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
    <>
      {/* 桌面端顶部导航 */}
      <header className="farm-nav sticky top-0 z-50 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.div 
                className="text-4xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                🌾
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-green-800">开心农场</h1>
                <p className="text-xs text-gray-500">{user.nickname || user.username} 的农场</p>
              </div>
            </motion.div>

            {/* 用户信息 */}
            <div className="flex items-center gap-4">
              {/* 金币 */}
              <motion.div 
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-700">{user.coins}</span>
              </motion.div>

              {/* 等级和经验 */}
              <div className="flex items-center gap-2">
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
                    <span className="text-lg mr-1">{item.emoji}</span>
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

      {/* 移动端顶部栏 */}
      <header className="farm-nav sticky top-0 z-50 sm:hidden">
        <div className="px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-green-800">开心农场</span>
          </div>
          
          {/* 金币和等级 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100">
              <Coins className="w-4 h-4 text-yellow-600" />
              <span className="font-bold text-yellow-700 text-sm">{user.coins}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100">
              <Star className="w-3 h-3 text-blue-600" />
              <span className="font-bold text-blue-700 text-sm">{user.level}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 移动端底部导航 */}
      <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-50 sm:hidden safe-bottom">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                className={`mobile-nav-item flex flex-col items-center py-2 px-6 rounded-xl ${
                  isActive ? 'active' : 'text-gray-500'
                }`}
                onClick={() => setCurrentView(item.id)}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-2xl mb-1">{item.emoji}</span>
                <span className={`text-xs font-medium ${isActive ? 'text-green-600' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-0 w-12 h-1 bg-green-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* 移动端底部占位 */}
      <div className="h-20 sm:hidden" />
    </>
  );
}
