import { create } from 'zustand';
import { User, Land, InventoryItem, ShopItem } from '@/types/farm';

interface FarmState {
  // 用户状态
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  // 农场状态
  lands: Land[];
  seeds: InventoryItem[];

  // 商店状态
  shopItems: ShopItem[];

  // 背包状态
  inventory: InventoryItem[];

  // 当前视图
  currentView: 'farm' | 'shop' | 'inventory';
  
  // 选中的土地/种子
  selectedLand: Land | null;
  selectedSeed: InventoryItem | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setLands: (lands: Land[]) => void;
  setSeeds: (seeds: InventoryItem[]) => void;
  setShopItems: (items: ShopItem[]) => void;
  setInventory: (inventory: InventoryItem[]) => void;
  setCurrentView: (view: 'farm' | 'shop' | 'inventory') => void;
  setSelectedLand: (land: Land | null) => void;
  setSelectedSeed: (seed: InventoryItem | null) => void;
  
  // 更新用户金币
  updateCoins: (amount: number) => void;
  updateExp: (exp: number) => void;
  updateLevel: (level: number) => void;

  // 重置状态
  reset: () => void;
}

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: true,
  lands: [],
  seeds: [],
  shopItems: [],
  inventory: [],
  currentView: 'farm' as const,
  selectedLand: null,
  selectedSeed: null,
};

export const useFarmStore = create<FarmState>((set) => ({
  ...initialState,

  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setLoading: (isLoading) => set({ isLoading }),
  setLands: (lands) => set({ lands }),
  setSeeds: (seeds) => set({ seeds }),
  setShopItems: (shopItems) => set({ shopItems }),
  setInventory: (inventory) => set({ inventory }),
  setCurrentView: (currentView) => set({ currentView }),
  setSelectedLand: (selectedLand) => set({ selectedLand }),
  setSelectedSeed: (selectedSeed) => set({ selectedSeed }),

  updateCoins: (amount) => set((state) => ({
    user: state.user ? { ...state.user, coins: state.user.coins + amount } : null,
  })),

  updateExp: (exp) => set((state) => ({
    user: state.user ? { ...state.user, exp } : null,
  })),

  updateLevel: (level) => set((state) => ({
    user: state.user ? { ...state.user, level } : null,
  })),

  reset: () => set(initialState),
}));
