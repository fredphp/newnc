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

export function FarmGame() {
  const { 
    user, isLoggedIn, isLoading, setUser, setLoading, 
    setLands, setSeeds, lands, seeds 
  } = useFarmStore();
  
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [showPlantDialog, setShowPlantDialog] = useState(false);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            className="text-8xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌾
          </motion.div>
          <motion.p 
            className="text-xl text-green-800 font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            加载中...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // 未登录
  if (!isLoggedIn) {
    return <AuthForm />;
  }

  // 已登录
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {user && (
          <AnimatePresence mode="wait">
            <motion.div
              key={useFarmStore.getState().currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              {useFarmStore.getState().currentView === 'farm' && (
                <>
                  {/* 农场标题 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌾</span>
                      <h2 className="text-xl font-bold text-green-800">我的农场</h2>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="text-green-600 font-bold">{lands.filter(l => l.isUnlocked).length}</span>
                        <span>/</span>
                        <span>{lands.length}</span>
                        <span>块土地</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* 农场网格 */}
                  <LandGrid onPlantClick={handlePlantClick} />
                  
                  {/* 快捷操作提示 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 p-4 bg-white/50 backdrop-blur rounded-xl text-center text-sm text-gray-500"
                  >
                    💡 点击空地种植作物，点击成熟作物进行收获
                  </motion.div>
                </>
              )}

              {useFarmStore.getState().currentView === 'shop' && <ShopPanel />}

              {useFarmStore.getState().currentView === 'inventory' && <InventoryPanel />}
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

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            🌾 开心农场 - 种植、收获、赚钱！
          </p>
        </div>
      </footer>
    </div>
  );
}
