# 开心农场项目 - 工作日志

## 项目概述
基于 Next.js 16 实现的完整农场游戏系统，模拟 GitHub 项目 `fredphp/nongchang` 的所有核心功能。

## 技术栈
- **前端**: Next.js 16 + React 19 + TypeScript + Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **数据库**: SQLite (Prisma ORM)
- **缓存**: 内存缓存 (替代 Redis)

## 完成的模块

### 1. 用户服务 (User Service)
- **注册功能** (`POST /api/auth/register`)
  - 用户名验证（3-20字符）
  - 密码验证（至少6字符）
  - 密码哈希存储
  - 自动创建初始土地和种子

- **登录功能** (`POST /api/auth/login`)
  - 用户名/密码验证
  - Session 管理（24小时过期）

- **其他接口**
  - `GET /api/auth/me` - 获取当前用户信息
  - `POST /api/auth/logout` - 退出登录

### 2. 农场服务 (Farm Service)
- **土地管理**
  - `GET /api/farm/lands` - 获取用户所有土地及作物状态
  - `POST /api/farm/unlock` - 解锁新土地（消耗金币）

- **种植系统**
  - `POST /api/farm/plant` - 种植作物（消耗种子）
  - 作物生长时间计算（非轮询，基于时间戳计算）

- **收获系统**
  - `POST /api/farm/harvest` - 收获成熟作物
  - 自动添加到背包
  - 经验值奖励
  - 等级提升检测

### 3. 商店服务 (Shop Service)
- **商品列表** (`GET /api/shop/items`)
  - 种子商品展示
  - 等级限制显示
  - 价格和库存信息

- **购买功能** (`POST /api/shop/buy`)
  - 金币扣除
  - 库存管理
  - 自动添加到背包

### 4. 背包服务 (Inventory Service)
- **背包列表** (`GET /api/inventory/list`)
  - 种子、作物、道具分类展示

- **出售功能** (`POST /api/inventory/sell`)
  - 出售成熟作物获取金币
  - 数量选择

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

## 项目结构
```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # 用户认证 API
│   │   ├── farm/          # 农场服务 API
│   │   ├── shop/          # 商店服务 API
│   │   └── inventory/     # 背包服务 API
│   └── page.tsx           # 主页面
├── components/
│   └── farm/              # 农场游戏组件
│       ├── AuthForm.tsx   # 登录/注册表单
│       ├── FarmGame.tsx   # 游戏主组件
│       ├── Header.tsx     # 顶部导航
│       ├── InventoryPanel.tsx  # 背包面板
│       ├── LandGrid.tsx   # 土地网格
│       ├── PlantDialog.tsx # 种植对话框
│       └── ShopPanel.tsx  # 商店面板
├── lib/
│   ├── auth.ts            # 认证工具函数
│   └── db.ts              # 数据库连接
├── store/
│   └── farmStore.ts       # Zustand 状态管理
├── types/
│   └── farm.ts            # TypeScript 类型定义
└── prisma/
    ├── schema.prisma      # 数据库模型
    └── seed.ts            # 种子数据
```

## 测试账号
- 用户名: `demo`
- 密码: `demo123`

## 功能特点
1. **完整游戏循环**: 种植 → 成长 → 收获 → 出售 → 购买种子
2. **等级系统**: 经验值积累，解锁更多作物
3. **土地扩展**: 消耗金币解锁更多土地
4. **实时状态**: 作物生长进度实时显示，无需刷新
5. **响应式设计**: 适配移动端和桌面端

---
*本项目在 Next.js 环境中实现了与原 PHP/go-zero 项目相同的农场游戏功能*
