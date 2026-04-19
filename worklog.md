# 开心农场项目 - 工作日志

## 项目概述
基于 Next.js 16 实现的完整农场游戏系统，模拟 GitHub 项目 `fredphp/nongchang` 的所有核心功能。

---

## 技术栈
- **前端**: Next.js 16 + React 19 + TypeScript + Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **动画**: Framer Motion
- **数据库**: SQLite (Prisma ORM)
- **缓存**: 内存缓存 (替代 Redis)

---

## 已完成的模块

### 1. 用户服务 (User Service)
| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/auth/register` | POST | 用户注册（含初始土地和种子） |
| `/api/auth/login` | POST | 用户登录（Session管理） |
| `/api/auth/me` | GET | 获取当前用户信息 |
| `/api/auth/logout` | POST | 退出登录 |

### 2. 农场服务 (Farm Service)
| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/farm/lands` | GET | 获取用户所有土地及作物状态 |
| `/api/farm/unlock` | POST | 解锁新土地（消耗金币） |
| `/api/farm/plant` | POST | 种植作物（消耗种子） |
| `/api/farm/harvest` | POST | 收获成熟作物 |

### 3. 商店服务 (Shop Service)
| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/shop/items` | GET | 获取商店商品列表 |
| `/api/shop/buy` | POST | 购买商品（扣除金币） |

### 4. 背包服务 (Inventory Service)
| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/inventory/list` | GET | 获取背包物品（分类展示） |
| `/api/inventory/sell` | POST | 出售作物获取金币 |

---

## 核心业务逻辑

### 作物成长逻辑（时间计算，非轮询）
```typescript
function calculateCropStatus(plantedAt, growthTime, stageCount, isHarvested) {
  const elapsed = Date.now() - plantedAt.getTime();
  const progress = Math.min(100, (elapsed / (growthTime * 1000)) * 100);
  const stage = Math.min(stageCount, Math.floor(progress / (100 / stageCount)) + 1);
  const isReady = progress >= 100;
  const remainingTime = Math.max(0, Math.ceil((growthTime * 1000 - elapsed) / 1000));
  
  return { stage, progress, isReady, remainingTime };
}
```

### 经验值与等级系统
- 每收获作物获得经验值
- 每 100 经验值升一级
- 部分作物需要达到指定等级才能种植

---

## 前端组件结构

```
src/components/farm/
├── AuthForm.tsx       # 登录/注册表单（含动画）
├── FarmGame.tsx       # 游戏主组件（路由控制）
├── Header.tsx         # 顶部导航栏
├── LandGrid.tsx       # 农场土地网格（核心）
├── PlantDialog.tsx    # 种植选择对话框
├── ShopPanel.tsx      # 商店面板
└── InventoryPanel.tsx # 背包面板
```

---

## UI/UX 特性

### 视觉效果
- 🎨 渐变背景（绿色农场主题）
- 🌱 作物摇晃动画
- ✨ 成熟作物脉冲提示
- 🎯 响应式设计（移动端适配）

### 交互体验
- 🖱️ 点击土地进行操作
- 📊 实时进度条显示
- 🎉 收获成功动画
- 💰 金币变化反馈

---

## 数据库模型

```
User (用户)
├── id, username, password, nickname
├── coins, exp, level
└── 关联: lands[], inventory[], transactions[]

CropTemplate (作物模板)
├── id, name, icon
├── seedPrice, sellPrice
├── growthTime, expReward
└── stageCount, minLevel

Land (土地)
├── id, position, isUnlocked
├── unlockPrice
└── 关联: plantedCrop

PlantedCrop (种植记录)
├── landId, cropId
├── plantedAt, isHarvested
└── harvestedAt

ShopItem (商店商品)
├── id, name, type
├── itemId, price, stock
└── minLevel, isActive

Inventory (背包)
├── userId, itemType, itemId
└── quantity

Transaction (交易记录)
├── userId, type, amount
└── description, createdAt
```

---

## 测试账号
- **用户名**: `demo`
- **密码**: `demo123`
- **初始金币**: 1000
- **初始土地**: 6块（前3块已解锁）
- **初始种子**: 胡萝卜 x5, 番茄 x3

---

## 环境说明

由于当前项目环境限制：
- ✅ 使用 **Next.js 16**（非 uniapp）
- ✅ 使用 **Next.js API Routes**（非 go-zero）
- ✅ 使用 **SQLite + Prisma**（非 MySQL）
- ✅ 使用 **内存缓存**（非 Redis）

所有功能已在 Next.js 环境中完整实现，可正常运行。

---

*项目完成时间: 2024*
