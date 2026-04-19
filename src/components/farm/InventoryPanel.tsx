'use client';

import { useState, useEffect } from 'react';
import { InventoryItem } from '@/types/farm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { Package, Coins, Leaf, Sprout, Wheat } from 'lucide-react';

export function InventoryPanel() {
  const { inventory, setInventory, user, setUser } = useFarmStore();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [isSelling, setIsSelling] = useState(false);

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory/list');
      const data = await res.json();
      setInventory(data.inventory);
    } catch (error) {
      console.error('获取背包失败:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSell = async () => {
    if (!selectedItem) return;

    setIsSelling(true);
    try {
      const res = await fetch('/api/inventory/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inventoryId: selectedItem.id,
          quantity: sellQuantity,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        // 更新用户金币
        if (user) {
          setUser({ ...user, coins: user.coins + data.earnings });
        }
        fetchInventory();
        setShowSellDialog(false);
        setSellQuantity(1);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('出售失败');
    } finally {
      setIsSelling(false);
    }
  };

  const seeds = inventory.filter((item) => item.itemType === 'seed');
  const crops = inventory.filter((item) => item.itemType === 'crop');
  const tools = inventory.filter((item) => item.itemType === 'tool');

  const totalEarnings = selectedItem && selectedItem.detail
    ? selectedItem.detail.sellPrice * sellQuantity
    : 0;

  const renderItems = (items: InventoryItem[], type: 'seed' | 'crop') => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-400">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>暂无物品</p>
        </div>
      ) : (
        items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{item.detail?.icon || '📦'}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.detail?.name || '未知'}</p>
                  <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                </div>
              </div>
              {type === 'crop' && item.detail && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    setSelectedItem(item);
                    setSellQuantity(1);
                    setShowSellDialog(true);
                  }}
                >
                  💰 出售 ({item.detail.sellPrice}金币/个)
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Package className="w-5 h-5" />
          背包
        </h2>
        <div className="flex items-center gap-2 text-yellow-600 font-semibold">
          <Coins className="w-5 h-5" />
          {user?.coins || 0}
        </div>
      </div>

      <Tabs defaultValue="seeds" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mx-4 w-[calc(100%-2rem)]">
          <TabsTrigger value="seeds" className="flex items-center gap-1">
            <Sprout className="w-4 h-4" />
            种子 ({seeds.length})
          </TabsTrigger>
          <TabsTrigger value="crops" className="flex items-center gap-1">
            <Wheat className="w-4 h-4" />
            作物 ({crops.length})
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-1">
            <Leaf className="w-4 h-4" />
            道具 ({tools.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seeds" className="mt-4 px-4">
          {renderItems(seeds, 'seed')}
        </TabsContent>

        <TabsContent value="crops" className="mt-4 px-4">
          {renderItems(crops, 'crop')}
        </TabsContent>

        <TabsContent value="tools" className="mt-4 px-4">
          {renderItems(tools, 'tool')}
        </TabsContent>
      </Tabs>

      {/* 出售对话框 */}
      <Dialog open={showSellDialog} onOpenChange={setShowSellDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>💰 出售作物</DialogTitle>
            <DialogDescription>
              {selectedItem?.detail?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && selectedItem.detail && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-5xl mb-2">{selectedItem.detail.icon}</div>
                <p className="font-semibold">{selectedItem.detail.name}</p>
                <p className="text-sm text-gray-500">库存: {selectedItem.quantity}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">出售数量</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSellQuantity(Math.max(1, sellQuantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{sellQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSellQuantity(Math.min(selectedItem.quantity, sellQuantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={selectedItem.quantity}
                  value={sellQuantity}
                  onChange={(e) => setSellQuantity(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <span>全部 ({selectedItem.quantity})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">单价</p>
                  <p className="font-bold text-yellow-600">💰 {selectedItem.detail.sellPrice}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-500">总收益</p>
                  <p className="font-bold text-green-600">💰 {totalEarnings}</p>
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleSell}
                disabled={isSelling}
              >
                {isSelling ? '出售中...' : '确认出售'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
