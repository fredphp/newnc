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
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>🌱 选择种子</DialogTitle>
          <DialogDescription>
            土地 #{land?.position} - 选择要种植的作物
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {seeds.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-4xl mb-2">📭</p>
              <p>没有可用的种子</p>
              <p className="text-sm">去商店购买种子吧！</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {seeds.map((seed) => (
                  <Button
                    key={seed.id}
                    variant={selectedSeed?.id === seed.id ? 'default' : 'outline'}
                    className={`h-auto py-3 flex flex-col items-center ${
                      selectedSeed?.id === seed.id ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                    onClick={() => setSelectedSeed(seed)}
                  >
                    <span className="text-2xl mb-1">{seed.detail?.icon}</span>
                    <span className="text-sm font-medium">{seed.detail?.name}</span>
                    <span className="text-xs opacity-70">库存: {seed.quantity}</span>
                  </Button>
                ))}
              </div>

              {selectedSeed && selectedSeed.detail && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">生长时间</span>
                    <span>{selectedSeed.detail.growthTime}秒</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">出售价格</span>
                    <span className="text-green-600">💰 {selectedSeed.detail.sellPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">经验奖励</span>
                    <span className="text-blue-600">✨ {selectedSeed.detail.expReward}</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
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
