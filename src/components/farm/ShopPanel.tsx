'use client';

import { useState, useEffect } from 'react';
import { ShopItem } from '@/types/farm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { ShoppingCart, Lock, Coins, Leaf, Clock, Star, Plus, Minus } from 'lucide-react';

export function ShopPanel() {
  const { shopItems, user, setShopItems, setUser } = useFarmStore();
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const fetchShopItems = async () => {
    try {
      const res = await fetch('/api/shop/items');
      const data = await res.json();
      setShopItems(data.items);
    } catch (error) {
      console.error('获取商店商品失败:', error);
    }
  };

  useEffect(() => {
    fetchShopItems();
  }, []);

  const handleBuy = async () => {
    if (!selectedItem) return;

    setIsBuying(true);
    try {
      const res = await fetch('/api/shop/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopItemId: selectedItem.id,
          quantity,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        if (user) {
          setUser({ ...user, coins: user.coins - data.cost });
        }
        fetchShopItems();
        setShowBuyDialog(false);
        setQuantity(1);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('购买失败');
    } finally {
      setIsBuying(false);
    }
  };

  const totalPrice = selectedItem ? selectedItem.price * quantity : 0;

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏪</span>
          <h2 className="text-xl font-bold text-green-800">种子商店</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200">
          <Coins className="w-5 h-5 text-yellow-600" />
          <span className="font-bold text-yellow-700">{user?.coins || 0}</span>
        </div>
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className={`
              farm-card p-4 cursor-pointer transition-all duration-300
              ${item.canBuy ? 'hover:shadow-xl hover:scale-105' : 'opacity-60'}
            `}
            onClick={() => {
              if (item.canBuy) {
                setSelectedItem(item);
                setShowBuyDialog(true);
                setQuantity(1);
              }
            }}
          >
            {/* 锁定遮罩 */}
            {item.isLocked && (
              <div className="absolute inset-0 bg-gray-900/60 rounded-xl flex items-center justify-center z-10">
                <div className="text-center text-white">
                  <Lock className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">Lv.{item.minLevel} 解锁</p>
                </div>
              </div>
            )}
            
            <div className="text-center relative">
              {/* 作物图标 */}
              <div className="text-5xl mb-3 crop-icon">{item.detail?.icon || '🌱'}</div>
              
              {/* 名称 */}
              <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
              
              {/* 价格 */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-yellow-600 text-lg">{item.price}</span>
              </div>
              
              {/* 属性信息 */}
              {item.detail && (
                <div className="flex justify-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.detail.growthTime}s
                  </span>
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    {item.detail.sellPrice}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {item.detail.expReward}
                  </span>
                </div>
              )}
              
              {/* 库存 */}
              {item.stock !== -1 && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  库存: {item.stock}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 购买对话框 */}
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="sm:max-w-md farm-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">🛒 购买种子</DialogTitle>
            <DialogDescription className="text-center">{selectedItem?.name}</DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              {/* 商品信息 */}
              <div className="text-center py-4">
                <div className="text-6xl mb-3 crop-icon">{selectedItem.detail?.icon || '🌱'}</div>
                <p className="text-xl font-bold text-gray-800">{selectedItem.name}</p>
                {selectedItem.description && (
                  <p className="text-sm text-gray-500 mt-1">{selectedItem.description}</p>
                )}
              </div>

              {/* 数量选择 */}
              <div className="space-y-2">
                <Label className="text-gray-600">购买数量</Label>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center w-20 text-lg font-bold"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 价格信息 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">单价</p>
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold text-gray-800">{selectedItem.price}</span>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl text-center border-2 border-yellow-200">
                  <p className="text-xs text-gray-500 mb-1">总价</p>
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold text-yellow-600">{totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* 当前金币 */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <span className="text-gray-600">当前金币</span>
                <div className="flex items-center gap-1">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="text-xl font-bold text-blue-600">{user?.coins || 0}</span>
                </div>
              </div>

              {/* 购买按钮 */}
              <Button
                className="w-full farm-button text-lg py-6"
                onClick={handleBuy}
                disabled={isBuying || (user?.coins || 0) < totalPrice}
              >
                {isBuying ? '购买中...' : '✅ 确认购买'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
