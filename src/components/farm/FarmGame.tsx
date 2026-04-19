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
import { toast } from 'sonner';

export function FarmGame() {
  const { user, isLoggedIn, isLoading, setUser, setLoading, setLands, setSeeds, lands, seeds } = useFarmStore();
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🌾</div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  // 未登录
  if (!isLoggedIn) {
    return <AuthForm />;
  }

  // 已登录
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {user && (
          <div className="p-4">
            {useFarmStore.getState().currentView === 'farm' && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    🌱 我的农场
                  </h2>
                  <p className="text-sm text-gray-500">
                    已解锁 {lands.filter(l => l.isUnlocked).length}/{lands.length} 块土地
                  </p>
                </div>
                <LandGrid onPlantClick={handlePlantClick} />
              </>
            )}

            {useFarmStore.getState().currentView === 'shop' && <ShopPanel />}

            {useFarmStore.getState().currentView === 'inventory' && <InventoryPanel />}
          </div>
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
      <footer className="bg-white/80 backdrop-blur-md border-t py-3">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>🌾 开心农场 - 种植、收获、赚钱！</p>
        </div>
      </footer>
    </div>
  );
}
