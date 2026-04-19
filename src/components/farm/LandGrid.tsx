'use client';

import { useEffect, useState, useCallback } from 'react';
import { Land } from '@/types/farm';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { Lock, Sprout, Clock, Coins, Star, Zap } from 'lucide-react';

// 作物图标根据阶段显示
const getStageIcon = (stage: number, cropIcon: string, isReady: boolean = false) => {
  if (stage <= 1) return '🌱';
  if (stage <= 2) return '🌿';
  if (stage <= 3) return '☘️';
  return cropIcon;
};

// 格式化剩余时间
const formatTime = (seconds: number): string => {
  if (seconds <= 0) return '已成熟';
  if (seconds < 60) return `${seconds}秒`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}分${secs}秒`;
};

interface LandGridProps {
  onPlantClick: (land: Land) => void;
}

export function LandGrid({ onPlantClick }: LandGridProps) {
  const { lands, seeds, user, setLands, setUser } = useFarmStore();
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [harvestingLandId, setHarvestingLandId] = useState<string | null>(null);

  // 定时刷新作物状态
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshKey((k) => k + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const refreshLands = useCallback(async () => {
    try {
      const res = await fetch('/api/farm/lands');
      const data = await res.json();
      if (data.lands) {
        setLands(data.lands);
      }
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('刷新土地状态失败:', error);
    }
  }, [setLands, setUser]);

  const handleHarvest = async () => {
    if (!selectedLand) return;

    setIsHarvesting(true);
    setHarvestingLandId(selectedLand.id);
    
    try {
      const res = await fetch('/api/farm/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landId: selectedLand.id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message, {
          description: data.leveledUp ? `🎉 恭喜升级到 ${data.newLevel} 级！` : `获得 ${data.expGain} 经验`,
        });
        refreshLands();
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('收获失败');
    } finally {
      setIsHarvesting(false);
      setHarvestingLandId(null);
      setShowDialog(false);
      setSelectedLand(null);
    }
  };

  const handleUnlock = async () => {
    if (!selectedLand) return;

    setIsUnlocking(true);
    try {
      const res = await fetch('/api/farm/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landId: selectedLand.id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        refreshLands();
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('解锁失败');
    } finally {
      setIsUnlocking(false);
      setShowDialog(false);
      setSelectedLand(null);
    }
  };

  const handleLandClick = (land: Land) => {
    setSelectedLand(land);
    setShowDialog(true);
  };

  return (
    <>
      {/* 农场网格 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-4">
        {lands.map((land) => {
          const isPlanted = land.plantedCrop && !land.plantedCrop.isHarvested;
          const cropStatus = land.cropStatus;
          const isReady = isPlanted && cropStatus?.isReady;
          const isHarvestingThis = harvestingLandId === land.id;

          return (
            <div
              key={land.id}
              className={`
                farm-land cursor-pointer
                ${!land.isUnlocked ? 'locked' : ''}
                ${isReady ? 'ready' : ''}
                ${isHarvestingThis ? 'harvesting' : ''}
              `}
              onClick={() => handleLandClick(land)}
            >
              <div className="aspect-square flex flex-col items-center justify-center p-2">
                {!land.isUnlocked ? (
                  // 未解锁的土地
                  <div className="text-center">
                    <Lock className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                    <p className="text-xs text-gray-200 font-bold">#{land.position}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Coins className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-bold">{land.unlockPrice}</span>
                    </div>
                  </div>
                ) : isPlanted && cropStatus ? (
                  // 已种植的土地
                  <div className="text-center w-full" key={refreshKey}>
                    <div className={`crop-icon text-3xl sm:text-4xl ${isReady ? 'growing' : ''}`}>
                      {getStageIcon(cropStatus.stage, land.plantedCrop!.crop.icon, cropStatus.isReady)}
                    </div>
                    <p className="text-xs font-bold text-amber-800 truncate mt-1">
                      {land.plantedCrop!.crop.name}
                    </p>
                    
                    {/* 进度条 */}
                    <div className="farm-progress mt-1.5">
                      <div 
                        className="farm-progress-bar"
                        style={{ width: `${cropStatus.progress}%` }}
                      />
                    </div>
                    
                    {isReady ? (
                      <Badge className="mt-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold animate-pulse">
                        ✨ 可收获
                      </Badge>
                    ) : (
                      <p className="text-xs text-amber-700 mt-1 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(cropStatus.remainingTime)}
                      </p>
                    )}
                  </div>
                ) : (
                  // 空地
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center border-2 border-amber-400">
                      <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                    </div>
                    <p className="text-xs text-amber-700 font-bold">#{land.position}</p>
                    <p className="text-xs text-green-700 font-medium">点击种植</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 土地操作弹窗 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md farm-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {selectedLand && (
                <span>
                  {selectedLand.isUnlocked
                    ? selectedLand.plantedCrop && !selectedLand.plantedCrop.isHarvested
                      ? selectedLand.cropStatus?.isReady
                        ? '🌾 收获作物'
                        : '🌱 作物生长中'
                      : '🌱 种植作物'
                    : '🔓 解锁土地'}
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="text-center">
              {selectedLand && (
                <span>
                  土地 #{selectedLand.position}
                  {selectedLand.plantedCrop && ` - ${selectedLand.plantedCrop.crop.name}`}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedLand && (
            <div className="space-y-4">
              {!selectedLand.isUnlocked ? (
                // 解锁土地
                <div className="space-y-3">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">解锁这块土地来种植更多作物</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-amber-50 rounded-xl text-center">
                      <p className="text-xs text-gray-500 mb-1">解锁费用</p>
                      <div className="flex items-center justify-center gap-1">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <span className="text-xl font-bold text-amber-600">{selectedLand.unlockPrice}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl text-center">
                      <p className="text-xs text-gray-500 mb-1">当前金币</p>
                      <div className="flex items-center justify-center gap-1">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <span className="text-xl font-bold text-blue-600">{user?.coins || 0}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full farm-button text-lg py-6"
                    onClick={handleUnlock}
                    disabled={isUnlocking || (user?.coins || 0) < selectedLand.unlockPrice}
                  >
                    {isUnlocking ? '解锁中...' : '🔓 解锁土地'}
                  </Button>
                </div>
              ) : selectedLand.plantedCrop && !selectedLand.plantedCrop.isHarvested ? (
                // 已种植
                selectedLand.cropStatus?.isReady ? (
                  // 可收获
                  <div className="space-y-3">
                    <div className="text-center py-4">
                      <div className="text-6xl mb-3 animate-bounce">
                        {selectedLand.plantedCrop.crop.icon}
                      </div>
                      <p className="text-xl font-bold text-amber-800">{selectedLand.plantedCrop.crop.name}</p>
                      <p className="text-sm text-green-600 font-medium">已经成熟，可以收获了！</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded-xl text-center">
                        <p className="text-xs text-gray-500 mb-1">出售价格</p>
                        <div className="flex items-center justify-center gap-1">
                          <Coins className="w-5 h-5 text-yellow-500" />
                          <span className="text-xl font-bold text-green-600">{selectedLand.plantedCrop.crop.sellPrice}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-xl text-center">
                        <p className="text-xs text-gray-500 mb-1">经验奖励</p>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-5 h-5 text-purple-500" />
                          <span className="text-xl font-bold text-purple-600">{selectedLand.plantedCrop.crop.expReward}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full farm-button text-lg py-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600"
                      onClick={handleHarvest}
                      disabled={isHarvesting}
                    >
                      {isHarvesting ? '收获中...' : '🌾 收获作物'}
                    </Button>
                  </div>
                ) : (
                  // 生长中
                  <div className="space-y-3">
                    <div className="text-center py-4">
                      <div className="text-6xl mb-3 crop-icon">
                        {getStageIcon(selectedLand.cropStatus?.stage || 1, selectedLand.plantedCrop.crop.icon)}
                      </div>
                      <p className="text-xl font-bold text-amber-800">{selectedLand.plantedCrop.crop.name}</p>
                      <p className="text-sm text-gray-500">正在生长中...</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">生长进度</span>
                        <span className="font-bold text-green-600">{selectedLand.cropStatus?.progress}%</span>
                      </div>
                      <div className="farm-progress h-4">
                        <div 
                          className="farm-progress-bar"
                          style={{ width: `${selectedLand.cropStatus?.progress || 0}%` }}
                        />
                      </div>
                      <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        剩余: <span className="font-bold text-amber-600">{formatTime(selectedLand.cropStatus?.remainingTime || 0)}</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">生长时间</p>
                        <p className="font-bold text-amber-600">{selectedLand.plantedCrop.crop.growthTime}秒</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">出售价格</p>
                        <p className="font-bold text-green-600">💰 {selectedLand.plantedCrop.crop.sellPrice}</p>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                // 空地 - 选择种子种植
                <div className="space-y-3">
                  <div className="text-center py-2">
                    <Sprout className="w-12 h-12 mx-auto text-green-500 mb-2" />
                    <p className="text-gray-500">选择一颗种子开始种植</p>
                  </div>
                  {seeds.length === 0 ? (
                    <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-xl">
                      <p className="text-lg">📭</p>
                      <p className="font-medium">没有可用的种子</p>
                      <p className="text-sm">去商店购买吧！</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1">
                      {seeds.map((seed) => (
                        <button
                          key={seed.id}
                          className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 transition-all duration-300 border-2 border-transparent hover:border-green-400 text-center"
                          onClick={() => {
                            onPlantClick(selectedLand);
                            setShowDialog(false);
                          }}
                        >
                          <span className="text-3xl block mb-1 crop-icon">{seed.detail?.icon}</span>
                          <span className="text-sm font-bold text-green-800 block">{seed.detail?.name}</span>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            x{seed.quantity}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
