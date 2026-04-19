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
import { Sprout, Clock, Coins, Star } from 'lucide-react';

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
        toast.success(data.message);
        onSuccess();
        onOpenChange(false);
        setSelectedSeed(null);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('种植失败');
    } finally {
      setIsPlanting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md farm-card">
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
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-lg">没有可用的种子</p>
              <p className="text-sm mt-2">去商店购买种子吧！</p>
            </div>
          ) : (
            <>
              {/* 种子选择网格 */}
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                {seeds.map((seed) => (
                  <button
                    key={seed.id}
                    onClick={() => setSelectedSeed(seed)}
                    className={`
                      p-4 rounded-xl transition-all duration-300 text-center
                      ${selectedSeed?.id === seed.id 
                        ? 'bg-gradient-to-br from-green-100 to-emerald-200 border-2 border-green-500 shadow-lg scale-105' 
                        : 'bg-gray-50 hover:bg-green-50 border-2 border-transparent hover:border-green-300'}
                    `}
                  >
                    <div className="text-4xl mb-2 crop-icon">{seed.detail?.icon}</div>
                    <p className="font-bold text-gray-800">{seed.detail?.name}</p>
                    <Badge variant="secondary" className="mt-1">x{seed.quantity}</Badge>
                  </button>
                ))}
              </div>

              {/* 选中种子的详情 */}
              {selectedSeed && selectedSeed.detail && (
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl crop-icon">{selectedSeed.detail.icon}</div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-green-800">{selectedSeed.detail.name}</p>
                      {selectedSeed.detail.description && (
                        <p className="text-sm text-gray-500 mt-1">{selectedSeed.detail.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-xs text-gray-500">生长时间</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-amber-600">{selectedSeed.detail.growthTime}s</span>
                      </div>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-xs text-gray-500">出售价格</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-green-600">{selectedSeed.detail.sellPrice}</span>
                      </div>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-xs text-gray-500">经验奖励</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-purple-500" />
                        <span className="font-bold text-purple-600">{selectedSeed.detail.expReward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 种植按钮 */}
              <Button
                className="w-full farm-button text-lg py-6"
                onClick={handlePlant}
                disabled={!selectedSeed || isPlanting}
              >
                {isPlanting ? '种植中...' : '🌱 开始种植'}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
