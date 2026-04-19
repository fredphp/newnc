'use client';

import { useState, useEffect } from 'react';
import { InventoryItem } from '@/types/farm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { Package, Coins, Sprout, Wheat, Star, Plus, Minus } from 'lucide-react';

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.length === 0 ? (
        <div className="col-span-full text-center py-12 text-gray-400">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">暂无物品</p>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="farm-card p-4 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              {/* 图标 */}
              <div className="text-5xl mb-2 crop-icon">{item.detail?.icon || '📦'}</div>
              
              {/* 名称 */}
              <p className="font-bold text-gray-800 mb-1">{item.detail?.name || '未知'}</p>
              
              {/* 数量 */}
              <Badge variant="secondary" className="mb-2">
                x{item.quantity}
              </Badge>
              
              {/* 出售按钮（仅作物可出售） */}
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
                  <Coins className="w-4 h-4 mr-1 text-yellow-500" />
                  出售 ({item.detail.sellPrice}/个)
                </Button>
              )}
              
              {/* 种子信息 */}
              {type === 'seed' && item.detail && (
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p className="flex items-center justify-center gap-1">
                    <Sprout className="w-3 h-3" />
                    生长: {item.detail.growthTime}s
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <Coins className="w-3 h-3" />
                    收益: {item.detail.sellPrice}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎒</span>
          <h2 className="text-xl font-bold text-green-800">我的背包</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200">
          <Coins className="w-5 h-5 text-yellow-600" />
          <span className="font-bold text-yellow-700">{user?.coins || 0}</span>
        </div>
      </div>

      {/* 分类标签 */}
      <Tabs defaultValue="seeds" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-white/50 p-1 rounded-xl">
          <TabsTrigger 
            value="seeds" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            <Sprout className="w-4 h-4" />
            <span>种子</span>
            <Badge variant="secondary" className="ml-1">{seeds.length}</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="crops"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            <Wheat className="w-4 h-4" />
            <span>作物</span>
            <Badge variant="secondary" className="ml-1">{crops.length}</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="tools"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            <Package className="w-4 h-4" />
            <span>道具</span>
            <Badge variant="secondary" className="ml-1">{tools.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seeds" className="mt-4">
          {renderItems(seeds, 'seed')}
        </TabsContent>

        <TabsContent value="crops" className="mt-4">
          {renderItems(crops, 'crop')}
        </TabsContent>

        <TabsContent value="tools" className="mt-4">
          {renderItems(tools, 'tool')}
        </TabsContent>
      </Tabs>

      {/* 出售对话框 */}
      <Dialog open={showSellDialog} onOpenChange={setShowSellDialog}>
        <DialogContent className="sm:max-w-md farm-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">💰 出售作物</DialogTitle>
            <DialogDescription className="text-center">{selectedItem?.detail?.name}</DialogDescription>
          </DialogHeader>

          {selectedItem && selectedItem.detail && (
            <div className="space-y-4">
              {/* 作物信息 */}
              <div className="text-center py-4">
                <div className="text-6xl mb-3 crop-icon">{selectedItem.detail.icon}</div>
                <p className="text-xl font-bold text-gray-800">{selectedItem.detail.name}</p>
                <p className="text-sm text-gray-500 mt-1">库存: {selectedItem.quantity}</p>
              </div>

              {/* 数量选择 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">出售数量</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 rounded-full"
                      onClick={() => setSellQuantity(Math.max(1, sellQuantity - 1))}
                      disabled={sellQuantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center text-xl font-bold">{sellQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 rounded-full"
                      onClick={() => setSellQuantity(Math.min(selectedItem.quantity, sellQuantity + 1))}
                      disabled={sellQuantity >= selectedItem.quantity}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* 滑块 */}
                <input
                  type="range"
                  min={1}
                  max={selectedItem.quantity}
                  value={sellQuantity}
                  onChange={(e) => setSellQuantity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <button 
                    className="text-green-600 font-medium hover:underline"
                    onClick={() => setSellQuantity(selectedItem.quantity)}
                  >
                    全部出售 ({selectedItem.quantity})
                  </button>
                </div>
              </div>

              {/* 价格信息 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">单价</p>
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold text-gray-800">{selectedItem.detail.sellPrice}</span>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl text-center border-2 border-green-200">
                  <p className="text-xs text-gray-500 mb-1">总收益</p>
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold text-green-600">{totalEarnings}</span>
                  </div>
                </div>
              </div>

              {/* 出售按钮 */}
              <Button
                className="w-full farm-button text-lg py-6"
                onClick={handleSell}
                disabled={isSelling}
              >
                {isSelling ? '出售中...' : '✅ 确认出售'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
