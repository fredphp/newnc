'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sprout, Clock, Coins, Star } from 'lucide-react';

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

// 金币飞出动画组件
function CoinAnimation({ x, y, amount }: { x: number; y: number; amount: number }) {
  return (
    <div
      className="coin-float"
      style={{ left: x, top: y }}
    >
      +{amount} 💰
    </div>
  );
}

export function LandGrid({ onPlantClick }: LandGridProps) {
  const { lands, seeds, user, setLands, setUser } = useFarmStore();
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [harvestingLandId, setHarvestingLandId] = useState<string | null>(null);
  const [coinAnimations, setCoinAnimations] = useState<Array<{ id: number; x: number; y: number; amount: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const coinIdRef = useRef(0);

  // 初始加载
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // 定时刷新作物状态
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshKey((k) => k + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const refreshLands = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
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
    } finally {
      if (showRefresh) setIsRefreshing(false);
    }
  }, [setLands, setUser]);

  // 添加金币动画
  const addCoinAnimation = useCallback((amount: number, event?: React.MouseEvent) => {
    if (!event) return;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const id = coinIdRef.current++;
    setCoinAnimations(prev => [...prev, { id, x: rect.left + rect.width / 2, y: rect.top, amount }]);
    setTimeout(() => {
      setCoinAnimations(prev => prev.filter(c => c.id !== id));
    }, 1200);
  }, []);

  const handleHarvest = async (event?: React.MouseEvent) => {
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
        // 添加金币动画
        if (selectedLand.plantedCrop?.crop.sellPrice) {
          addCoinAnimation(selectedLand.plantedCrop.crop.sellPrice, event);
        }
        
        // 成功提示
        toast.success(data.message, {
          description: data.leveledUp ? `🎉 恭喜升级到 ${data.newLevel} 级！` : `获得 ${data.expGain} 经验`,
          duration: 3000,
        });
        
        // 延迟刷新，让动画完成
        setTimeout(() => {
          refreshLands();
        }, 600);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('收获失败');
    } finally {
      setTimeout(() => {
        setIsHarvesting(false);
        setHarvestingLandId(null);
        setShowDialog(false);
        setSelectedLand(null);
      }, 700);
    }
  };

  const handleUnlock = async (event?: React.MouseEvent) => {
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

  // 骨架屏
  const renderSkeleton = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-4">
      {Array.from({ length: lands.length || 6 }).map((_, i) => (
        <div key={i} className="skeleton aspect-square rounded-xl" />
      ))}
    </div>
  );

  return (
    <>
      {/* 金币动画 */}
      <AnimatePresence>
        {coinAnimations.map(coin => (
          <CoinAnimation key={coin.id} x={coin.x} y={coin.y} amount={coin.amount} />
        ))}
      </AnimatePresence>

      {/* 下拉刷新提示 */}
      {isRefreshing && (
        <div className="flex justify-center py-2">
          <div className="loading-spinner text-2xl">⚙️</div>
        </div>
      )}

      {/* 农场网格 */}
      <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-4">
        {isLoading ? (
          // 骨架屏
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton aspect-square rounded-xl" />
          ))
        ) : (
          lands.map((land, index) => {
            const isPlanted = land.plantedCrop && !land.plantedCrop.isHarvested;
            const cropStatus = land.cropStatus;
            const isReady = isPlanted && cropStatus?.isReady;
            const isHarvestingThis = harvestingLandId === land.id;

            return (
              <motion.div
                key={land.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`
                  farm-land cursor-pointer
                  ${!land.isUnlocked ? 'locked' : ''}
                  ${isReady ? 'ready' : ''}
                `}
                onClick={() => handleLandClick(land)}
              >
                <div className="aspect-square flex flex-col items-center justify-center p-2 relative">
                  {!land.isUnlocked ? (
                    // 未解锁的土地
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Lock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 text-gray-300" />
                      <p className="text-xs text-gray-200 font-bold">#{land.position}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <span className="text-base sm:text-lg">💰</span>
                        <span className="text-xs text-yellow-300 font-bold">{land.unlockPrice}</span>
                      </div>
                    </motion.div>
                  ) : isPlanted && cropStatus ? (
                    // 已种植的土地
                    <div className="text-center w-full" key={refreshKey}>
                      <motion.div 
                        className={`
                          text-3xl sm:text-4xl crop-icon
                          ${isHarvestingThis ? 'harvest-animation' : ''}
                          ${isReady ? 'mature' : ''}
                        `}
                        animate={isHarvestingThis ? {} : undefined}
                      >
                        {getStageIcon(cropStatus.stage, land.plantedCrop!.crop.icon)}
                      </motion.div>
                      
                      <p className="text-xs font-bold text-amber-800 truncate mt-1">
                        {land.plantedCrop!.crop.name}
                      </p>
                      
                      {/* 进度条 */}
                      <div className="farm-progress mt-1.5 mx-auto w-full max-w-[80px]">
                        <motion.div 
                          className="farm-progress-bar"
                          initial={{ width: 0 }}
                          animate={{ width: `${cropStatus.progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      
                      {isReady ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <Badge className="mt-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 text-xs font-bold border-0">
                            ✨ 可收获
                          </Badge>
                        </motion.div>
                      ) : (
                        <p className="text-xs text-amber-700 mt-1 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(cropStatus.remainingTime)}
                        </p>
                      )}
                    </div>
                  ) : (
                    // 空地
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 rounded-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center border-2 border-green-400 shadow-inner">
                        <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                      </div>
                      <p className="text-xs text-amber-700 font-bold">#{land.position}</p>
                      <p className="text-xs text-green-700 font-medium">点击种植</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* 土地操作弹窗 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md farm-card border-0">
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

          <AnimatePresence mode="wait">
            {selectedLand && (
              <motion.div
                key={selectedLand.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {!selectedLand.isUnlocked ? (
                  // 解锁土地
                  <div className="space-y-3">
                    <div className="text-center py-4">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock className="w-8 h-8 text-gray-400" />
                      </motion.div>
                      <p className="text-gray-500">解锁这块土地来种植更多作物</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-amber-50 rounded-xl text-center">
                        <p className="text-xs text-gray-500 mb-1">解锁费用</p>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xl">💰</span>
                          <span className="text-xl font-bold text-amber-600">{selectedLand.unlockPrice}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-xl text-center">
                        <p className="text-xs text-gray-500 mb-1">当前金币</p>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xl">💰</span>
                          <span className="text-xl font-bold text-blue-600">{user?.coins || 0}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full farm-button text-lg py-6"
                      onClick={(e) => handleUnlock(e)}
                      disabled={isUnlocking || (user?.coins || 0) < selectedLand.unlockPrice}
                    >
                      {isUnlocking ? (
                        <span className="flex items-center gap-2">
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                          解锁中...
                        </span>
                      ) : '🔓 解锁土地'}
                    </Button>
                  </div>
                ) : selectedLand.plantedCrop && !selectedLand.plantedCrop.isHarvested ? (
                  // 已种植
                  selectedLand.cropStatus?.isReady ? (
                    // 可收获
                    <div className="space-y-3">
                      <div className="text-center py-4">
                        <motion.div 
                          className="text-6xl mb-3"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {selectedLand.plantedCrop.crop.icon}
                        </motion.div>
                        <p className="text-xl font-bold text-amber-800">{selectedLand.plantedCrop.crop.name}</p>
                        <motion.p 
                          className="text-sm text-green-600 font-medium mt-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          已经成熟，可以收获了！
                        </motion.p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-50 rounded-xl text-center">
                          <p className="text-xs text-gray-500 mb-1">出售价格</p>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-lg">💰</span>
                            <span className="text-xl font-bold text-green-600">{selectedLand.plantedCrop.crop.sellPrice}</span>
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl text-center">
                          <p className="text-xs text-gray-500 mb-1">经验奖励</p>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-lg">⭐</span>
                            <span className="text-xl font-bold text-purple-600">{selectedLand.plantedCrop.crop.expReward}</span>
                          </div>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className="w-full farm-button text-lg py-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600"
                          onClick={(e) => handleHarvest(e)}
                          disabled={isHarvesting}
                        >
                          {isHarvesting ? (
                            <span className="flex items-center gap-2">
                              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                              收获中...
                            </span>
                          ) : '🌾 收获作物'}
                        </Button>
                      </motion.div>
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
                          <motion.div 
                            className="farm-progress-bar"
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedLand.cropStatus?.progress || 0}%` }}
                            transition={{ duration: 0.5 }}
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
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sprout className="w-12 h-12 mx-auto text-green-500 mb-2" />
                      </motion.div>
                      <p className="text-gray-500">选择一颗种子开始种植</p>
                    </div>
                    {seeds.length === 0 ? (
                      <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-xl">
                        <p className="text-4xl mb-2">📭</p>
                        <p className="font-medium">没有可用的种子</p>
                        <p className="text-sm mt-1">去商店购买吧！</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1">
                        {seeds.map((seed, index) => (
                          <motion.button
                            key={seed.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 transition-colors border-2 border-transparent hover:border-green-400 text-center"
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
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
