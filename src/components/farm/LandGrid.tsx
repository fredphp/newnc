'use client';

import { useEffect, useState } from 'react';
import { Land } from '@/types/farm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { Lock, Sprout, Wheat, Leaf, Sun, Clock } from 'lucide-react';

// 作物图标根据阶段显示
const getStageIcon = (stage: number, cropIcon: string) => {
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
  const { lands, seeds, user, setLands } = useFarmStore();
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // 定时刷新作物状态
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshKey((k) => k + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const refreshLands = async () => {
    try {
      const res = await fetch('/api/farm/lands');
      const data = await res.json();
      if (data.lands) {
        setLands(data.lands);
      }
    } catch (error) {
      console.error('刷新土地状态失败:', error);
    }
  };

  const handleHarvest = async () => {
    if (!selectedLand) return;

    setIsHarvesting(true);
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
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-4">
        {lands.map((land) => {
          const isPlanted = land.plantedCrop && !land.plantedCrop.isHarvested;
          const cropStatus = land.cropStatus;

          return (
            <Card
              key={land.id}
              className={`
                relative overflow-hidden cursor-pointer transition-all duration-300
                ${land.isUnlocked ? 'hover:shadow-lg hover:scale-105' : 'opacity-80'}
                ${isPlanted && cropStatus?.isReady ? 'ring-2 ring-yellow-400 animate-pulse' : ''}
              `}
              onClick={() => handleLandClick(land)}
            >
              <CardContent className="p-3 aspect-square flex flex-col items-center justify-center">
                {!land.isUnlocked ? (
                  // 未解锁的土地
                  <div className="text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-xs text-gray-500">#{land.position}</p>
                    <p className="text-xs text-yellow-600 font-semibold">
                      🔒 {land.unlockPrice} 金币
                    </p>
                  </div>
                ) : isPlanted && cropStatus ? (
                  // 已种植的土地
                  <div className="text-center w-full" key={refreshKey}>
                    <div className="text-3xl mb-1 transition-transform duration-300">
                      {getStageIcon(cropStatus.stage, land.plantedCrop!.crop.icon)}
                    </div>
                    <p className="text-xs font-medium truncate">{land.plantedCrop!.crop.name}</p>
                    <Progress value={cropStatus.progress} className="h-1.5 mt-1" />
                    {cropStatus.isReady ? (
                      <Badge className="mt-1 bg-yellow-500 text-xs">可收获</Badge>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(cropStatus.remainingTime)}
                      </p>
                    )}
                  </div>
                ) : (
                  // 空地
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <Sprout className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-xs text-gray-500">空地 #{land.position}</p>
                    <p className="text-xs text-green-600">点击种植</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 土地操作弹窗 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
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
            <DialogDescription>
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
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span>解锁费用</span>
                    <span className="font-bold text-yellow-600">💰 {selectedLand.unlockPrice}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>当前金币</span>
                    <span className="font-bold">💰 {user?.coins || 0}</span>
                  </div>
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={handleUnlock}
                    disabled={isUnlocking || (user?.coins || 0) < selectedLand.unlockPrice}
                  >
                    {isUnlocking ? '解锁中...' : '解锁土地'}
                  </Button>
                </div>
              ) : selectedLand.plantedCrop && !selectedLand.plantedCrop.isHarvested ? (
                // 已种植
                selectedLand.cropStatus?.isReady ? (
                  // 可收获
                  <div className="space-y-3">
                    <div className="text-center py-4">
                      <div className="text-5xl mb-2">{selectedLand.plantedCrop.crop.icon}</div>
                      <p className="font-semibold">{selectedLand.plantedCrop.crop.name}</p>
                      <p className="text-sm text-gray-500">已经成熟，可以收获了！</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-sm">
                      <div className="p-2 bg-green-50 rounded">
                        <p className="text-gray-500">出售价格</p>
                        <p className="font-bold text-green-600">💰 {selectedLand.plantedCrop.crop.sellPrice}</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="text-gray-500">经验奖励</p>
                        <p className="font-bold text-blue-600">✨ {selectedLand.plantedCrop.crop.expReward}</p>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-yellow-500 hover:bg-yellow-600"
                      onClick={handleHarvest}
                      disabled={isHarvesting}
                    >
                      {isHarvesting ? '收获中...' : '🌾 收获'}
                    </Button>
                  </div>
                ) : (
                  // 生长中
                  <div className="space-y-3">
                    <div className="text-center py-4">
                      <div className="text-5xl mb-2">
                        {getStageIcon(selectedLand.cropStatus?.stage || 1, selectedLand.plantedCrop.crop.icon)}
                      </div>
                      <p className="font-semibold">{selectedLand.plantedCrop.crop.name}</p>
                      <p className="text-sm text-gray-500">正在生长中...</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>生长进度</span>
                        <span>{selectedLand.cropStatus?.progress}%</span>
                      </div>
                      <Progress value={selectedLand.cropStatus?.progress || 0} className="h-3" />
                      <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        剩余: {formatTime(selectedLand.cropStatus?.remainingTime || 0)}
                      </p>
                    </div>
                  </div>
                )
              ) : (
                // 空地 - 选择种子种植
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 text-center">选择一颗种子种植</p>
                  {seeds.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">
                      <p>没有可用的种子</p>
                      <p className="text-sm">去商店购买吧！</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {seeds.map((seed) => (
                        <Button
                          key={seed.id}
                          variant="outline"
                          className="h-auto py-3 flex flex-col items-center"
                          onClick={() => {
                            onPlantClick(selectedLand);
                            setShowDialog(false);
                          }}
                        >
                          <span className="text-2xl mb-1">{seed.detail?.icon}</span>
                          <span className="text-sm">{seed.detail?.name}</span>
                          <span className="text-xs text-gray-400">x{seed.quantity}</span>
                        </Button>
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
