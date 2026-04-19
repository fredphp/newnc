'use client';

import { useState, useEffect } from 'react';
import { ShopItem } from '@/types/farm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ShoppingCart, Lock, Coins, Leaf } from 'lucide-react';

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
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          商店
        </h2>
        <div className="flex items-center gap-2 text-yellow-600 font-semibold">
          <Coins className="w-5 h-5" />
          {user?.coins || 0}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
        {shopItems.map((item) => (
          <Card
            key={item.id}
            className={`relative overflow-hidden transition-all duration-300 ${
              item.canBuy ? 'hover:shadow-lg cursor-pointer hover:scale-105' : 'opacity-60'
            }`}
            onClick={() => {
              if (item.canBuy) {
                setSelectedItem(item);
                setShowBuyDialog(true);
              }
            }}
          >
            {item.isLocked && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10">
                <div className="text-center text-white">
                  <Lock className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs">Lv.{item.minLevel} 解锁</p>
                </div>
              </div>
            )}
            <CardHeader className="p-3 pb-0">
              <div className="text-3xl text-center mb-2">{item.detail?.icon || '🌱'}</div>
              <CardTitle className="text-sm text-center">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-600 font-semibold flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  {item.price}
                </span>
                {item.stock !== -1 && (
                  <Badge variant="secondary" className="text-xs">
                    库存: {item.stock}
                  </Badge>
                )}
              </div>
              {item.detail && (
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p className="flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    生长: {item.detail.growthTime}秒
                  </p>
                  <p>收益: 💰{item.detail.sellPrice} ✨{item.detail.expReward}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>购买商品</DialogTitle>
            <DialogDescription>{selectedItem?.name}</DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-5xl mb-2">{selectedItem.detail?.icon || '🌱'}</div>
                <p className="font-semibold">{selectedItem.name}</p>
                {selectedItem.description && (
                  <p className="text-sm text-gray-500">{selectedItem.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>购买数量</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center w-20"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">单价</p>
                  <p className="font-bold text-yellow-600">💰 {selectedItem.price}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">总价</p>
                  <p className="font-bold text-yellow-600">💰 {totalPrice}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm">当前金币</span>
                <span className="font-bold">💰 {user?.coins || 0}</span>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleBuy}
                disabled={isBuying || (user?.coins || 0) < totalPrice}
              >
                {isBuying ? '购买中...' : '确认购买'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
