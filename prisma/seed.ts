import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始填充种子数据...');

  // 清理现有数据
  await prisma.transaction.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.plantedCrop.deleteMany();
  await prisma.land.deleteMany();
  await prisma.shopItem.deleteMany();
  await prisma.cropTemplate.deleteMany();
  await prisma.user.deleteMany();

  // 创建作物模板
  const crops = await Promise.all([
    prisma.cropTemplate.create({
      data: {
        name: '胡萝卜',
        icon: '🥕',
        seedPrice: 50,
        sellPrice: 100,
        growthTime: 60, // 1分钟（演示用）
        expReward: 10,
        description: '新手作物，生长快速',
        stageCount: 4,
        minLevel: 1,
      },
    }),
    prisma.cropTemplate.create({
      data: {
        name: '番茄',
        icon: '🍅',
        seedPrice: 100,
        sellPrice: 200,
        growthTime: 120, // 2分钟
        expReward: 20,
        description: '红色多汁的番茄',
        stageCount: 4,
        minLevel: 1,
      },
    }),
    prisma.cropTemplate.create({
      data: {
        name: '玉米',
        icon: '🌽',
        seedPrice: 150,
        sellPrice: 300,
        growthTime: 180, // 3分钟
        expReward: 30,
        description: '金黄色的玉米棒',
        stageCount: 4,
        minLevel: 2,
      },
    }),
    prisma.cropTemplate.create({
      data: {
        name: '西瓜',
        icon: '🍉',
        seedPrice: 200,
        sellPrice: 450,
        growthTime: 300, // 5分钟
        expReward: 50,
        description: '夏季解暑佳品',
        stageCount: 4,
        minLevel: 3,
      },
    }),
    prisma.cropTemplate.create({
      data: {
        name: '草莓',
        icon: '🍓',
        seedPrice: 180,
        sellPrice: 380,
        growthTime: 240, // 4分钟
        expReward: 40,
        description: '香甜可口的草莓',
        stageCount: 4,
        minLevel: 2,
      },
    }),
    prisma.cropTemplate.create({
      data: {
        name: '向日葵',
        icon: '🌻',
        seedPrice: 250,
        sellPrice: 500,
        growthTime: 360, // 6分钟
        expReward: 60,
        description: '向阳而生的美丽花朵',
        stageCount: 4,
        minLevel: 4,
      },
    }),
    prisma.cropTemplate.create({
      data: {
        name: '南瓜',
        icon: '🎃',
        seedPrice: 300,
        sellPrice: 600,
        growthTime: 480, // 8分钟
        expReward: 80,
        description: '万圣节必备',
        stageCount: 4,
        minLevel: 5,
      },
    }),
    prisma.cropTemplate.create({
      data: {
        name: '辣椒',
        icon: '🌶️',
        seedPrice: 120,
        sellPrice: 250,
        growthTime: 150, // 2.5分钟
        expReward: 25,
        description: '火辣辣的辣椒',
        stageCount: 4,
        minLevel: 2,
      },
    }),
  ]);

  console.log(`创建了 ${crops.length} 种作物`);

  // 创建商店商品（种子）
  const shopItems = await Promise.all(
    crops.map((crop) =>
      prisma.shopItem.create({
        data: {
          name: `${crop.name}种子`,
          type: 'seed',
          itemId: crop.id,
          price: crop.seedPrice,
          stock: -1, // 无限库存
          minLevel: crop.minLevel,
          description: `种植后可获得${crop.name}`,
        },
      })
    )
  );

  console.log(`创建了 ${shopItems.length} 种商店商品`);

  // 创建测试用户
  const testUser = await prisma.user.create({
    data: {
      username: 'demo',
      password: 'demo123', // 实际应用应该加密
      nickname: '农场主',
      coins: 1000,
      exp: 0,
      level: 1,
    },
  });

  console.log(`创建了测试用户: ${testUser.username}`);

  // 为用户创建初始土地（6块，前3块解锁）
  for (let i = 1; i <= 6; i++) {
    await prisma.land.create({
      data: {
        userId: testUser.id,
        position: i,
        isUnlocked: i <= 3, // 前3块默认解锁
        unlockPrice: i <= 3 ? 0 : 500 * (i - 2), // 解锁价格递增
      },
    });
  }

  console.log('为用户创建了6块土地（前3块已解锁）');

  // 给测试用户一些初始种子
  await prisma.inventory.createMany({
    data: [
      { userId: testUser.id, itemType: 'seed', itemId: crops[0].id, quantity: 5 },
      { userId: testUser.id, itemType: 'seed', itemId: crops[1].id, quantity: 3 },
    ],
  });

  console.log('给测试用户添加了初始种子');
  console.log('种子数据填充完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
