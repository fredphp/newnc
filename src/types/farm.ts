// 用户类型
export interface User {
  id: string;
  username: string;
  nickname: string | null;
  coins: number;
  exp: number;
  level: number;
  avatar?: string | null;
}

// 作物模板类型
export interface CropTemplate {
  id: string;
  name: string;
  icon: string;
  seedPrice: number;
  sellPrice: number;
  growthTime: number;
  expReward: number;
  description: string | null;
  stageCount: number;
  minLevel: number;
}

// 作物状态
export interface CropStatus {
  stage: number;
  progress: number;
  isReady: boolean;
  remainingTime: number;
}

// 种植记录
export interface PlantedCrop {
  id: string;
  landId: string;
  cropId: string;
  plantedAt: string;
  isHarvested: boolean;
  harvestedAt: string | null;
  crop: CropTemplate;
}

// 土地
export interface Land {
  id: string;
  userId: string;
  position: number;
  isUnlocked: boolean;
  unlockPrice: number;
  plantedCrop: PlantedCrop | null;
  cropStatus: CropStatus | null;
}

// 商店商品
export interface ShopItem {
  id: string;
  name: string;
  type: 'seed' | 'tool' | 'decoration';
  itemId: string;
  price: number;
  stock: number;
  minLevel: number;
  description: string | null;
  isActive: boolean;
  detail: CropTemplate | null;
  canBuy: boolean;
  isLocked: boolean;
}

// 背包物品
export interface InventoryItem {
  id: string;
  userId: string;
  itemType: 'seed' | 'crop' | 'tool';
  itemId: string;
  quantity: number;
  detail: CropTemplate | null;
}

// 交易记录
export interface Transaction {
  id: string;
  userId: string;
  type: 'buy' | 'sell' | 'harvest' | 'unlock';
  amount: number;
  description: string;
  createdAt: string;
}
