'use client';

import { useState } from 'react';
import { Land, InventoryItem } from '@/types/farm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Clock, Coins, Star, Loader2, CheckCircle } from 'lucide-react';

interface PlantDialogProps {
  land: Land | null;
  seeds: InventoryItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PlantDialog({ land, seeds, open, onOpenChange, onSuccess }: PlantDialogProps) {
  const [selectedSeed, setSelectedSeed] = useState<InventoryItem | null>(null);
  const [isPlanting, setIsPlanting] = useState(false);
  const [plantSuccess, setPlantSuccess] = useState(false);

  const handlePlant = async () => {
    if (!land || !selectedSeed) return;

    setIsPlanting(true);
    try {
      const res = await fetch('/api/farm/plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landId: land.id,
          cropId: selectedSeed.itemId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // 显示成功动画
        setPlantSuccess(true);
        
        setTimeout(() => {
          toast.success(data.message, {
            icon: '🌱',
          });
          onSuccess();
          onOpenChange(false);
          setSelectedSeed(null);
          setPlantSuccess(false);
        }, 800);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('种植失败');
    } finally {
      setIsPlanting(false);
    }
  };

  // 重置状态
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedSeed(null);
      setPlantSuccess(false);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md farm-card border-0 overflow-hidden">
        {/* 成功动画覆盖层 */}
        <AnimatePresence>
          {plantSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="text-6xl mb-4"
                >
                  ✅
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-bold text-green-600"
                >
                  种植成功！
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <Sprout className="w-6 h-6 text-green-600" />
            选择种子
          </DialogTitle>
          <DialogDescription className="text-center">
            土地 #{land?.position} - 选择要种植的作物
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {seeds.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 text-gray-400"
            >
              <motion.div 
                className="text-6xl mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📭
              </motion.div>
              <p className="text-lg font-medium">没有可用的种子</p>
              <p className="text-sm mt-2 text-gray-500">去商店购买吧！</p>
            </motion.div>
          ) : (
            <>
              {/* 种子选择网格 */}
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                {seeds.map((seed, index) => (
                  <motion.button
                    key={seed.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSeed(seed)}
                    className={`
                      p-4 rounded-xl transition-all duration-200 text-center relative overflow-hidden
                      ${selectedSeed?.id === seed.id 
                        ? 'bg-gradient-to-br from-green-100 to-emerald-200 border-2 border-green-500 shadow-lg' 
                        : 'bg-gray-50 hover:bg-green-50 border-2 border-transparent hover:border-green-300'}
                    `}
                  >
                    {/* 选中标记 */}
                    {selectedSeed?.id === seed.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                    
                    <div className="text-4xl mb-2 crop-icon">{seed.detail?.icon}</div>
                    <p className="font-bold text-gray-800">{seed.detail?.name}</p>
                    <Badge variant="secondary" className="mt-1">x{seed.quantity}</Badge>
                  </motion.button>
                ))}
              </div>

              {/* 选中种子的详情 */}
              <AnimatePresence>
                {selectedSeed && selectedSeed.detail && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="text-5xl crop-icon"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {selectedSeed.detail.icon}
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-green-800">{selectedSeed.detail.name}</p>
                          {selectedSeed.detail.description && (
                            <p className="text-sm text-gray-500 mt-1">{selectedSeed.detail.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500">生长时间</p>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span className="font-bold text-amber-600">{selectedSeed.detail.growthTime}s</span>
                          </div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500">出售价格</p>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-green-600">{selectedSeed.detail.sellPrice}</span>
                          </div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500">经验奖励</p>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-purple-500" />
                            <span className="font-bold text-purple-600">{selectedSeed.detail.expReward}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 种植按钮 */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  className="w-full farm-button text-lg py-6"
                  onClick={handlePlant}
                  disabled={!selectedSeed || isPlanting}
                >
                  {isPlanting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      种植中...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      🌱 开始种植
                    </span>
                  )}
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
