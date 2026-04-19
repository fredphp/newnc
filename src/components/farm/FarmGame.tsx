'use client';

import { useEffect, useState, useCallback } from 'react';
import { useFarmStore } from '@/store/farmStore';
import { Land } from '@/types/farm';
import { AuthForm } from './AuthForm';
import { Header } from './Header';
import { LandGrid } from './LandGrid';
import { PlantDialog } from './PlantDialog';
import { ShopPanel } from './ShopPanel';
import { InventoryPanel } from './InventoryPanel';
import { motion, AnimatePresence } from 'framer-motion';

// 加载动画组件
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      <div className="text-center">
        <motion.div 
          className="text-8xl mb-6"
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌾
        </motion.div>
        
        <motion.h1 
          className="text-2xl font-bold text-green-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          开心农场
        </motion.h1>
        
        {/* 加载动画 */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-green-500"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        <motion.p 
          className="text-gray-500 mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          加载中...
        </motion.p>
      </div>
    </div>
  );
}

// 页面过渡动画
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
};

export function FarmGame() {
  const { 
    user, isLoggedIn, isLoading, setUser, setLoading, 
    setLands, setSeeds, lands, seeds 
  } = useFarmStore();
  
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [showPlantDialog, setShowPlantDialog] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // 检查登录状态
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  // 获取农场数据
  const fetchFarmData = useCallback(async () => {
    if (!user) return;
    
    setIsPageLoading(true);
    try {
      const res = await fetch('/api/farm/lands');
      const data = await res.json();
      if (data.lands) {
        setLands(data.lands);
      }
      if (data.seeds) {
        setSeeds(data.seeds);
      }
    } catch (error) {
      console.error('获取农场数据失败:', error);
    } finally {
      setIsPageLoading(false);
    }
  }, [user, setLands, setSeeds]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFarmData();
    }
  }, [isLoggedIn, fetchFarmData]);

  const handlePlantClick = (land: Land) => {
    setSelectedLand(land);
    setShowPlantDialog(true);
  };

  const handlePlantSuccess = () => {
    fetchFarmData();
  };

  // 加载中
  if (isLoading) {
    return <LoadingScreen />;
  }

  // 未登录
  if (!isLoggedIn) {
    return <AuthForm />;
  }

  // 当前视图
  const currentView = useFarmStore.getState().currentView;

  // 已登录
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full pb-4 sm:pb-0">
        {user && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="p-4"
            >
              {currentView === 'farm' && (
                <>
                  {/* 农场标题 */}
                  <motion.div 
                    className="flex items-center justify-between mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌾</span>
                      <h2 className="text-xl font-bold text-green-800">我的农场</h2>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full">
                        <span className="text-green-600 font-bold">{lands.filter(l => l.isUnlocked).length}</span>
                        <span>/</span>
                        <span>{lands.length}</span>
                        <span>块土地</span>
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* 农场网格 */}
                  <LandGrid onPlantClick={handlePlantClick} />
                  
                  {/* 快捷操作提示 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 p-4 bg-white/60 backdrop-blur rounded-xl text-center text-sm text-gray-500 shadow-sm"
                  >
                    💡 点击空地种植作物，点击成熟作物进行收获
                  </motion.div>
                </>
              )}

              {currentView === 'shop' && <ShopPanel />}

              {currentView === 'inventory' && <InventoryPanel />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* 种植对话框 */}
      <PlantDialog
        land={selectedLand}
        seeds={seeds}
        open={showPlantDialog}
        onOpenChange={setShowPlantDialog}
        onSuccess={handlePlantSuccess}
      />

      {/* Footer - 仅桌面端显示 */}
      <footer className="hidden sm:block bg-white/80 backdrop-blur-md border-t border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            🌾 开心农场 - 种植、收获、赚钱！
          </p>
        </div>
      </footer>
    </div>
  );
}
