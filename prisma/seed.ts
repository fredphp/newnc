import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始填充种子数据...');

  // 创建作物列表（12种作物）
  const crops = [
    { id: 1, crops_name: '核桃', crops_identifier: 'plantingApple', crops_harvest: '60', crops_probability: '10', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'hetao' },
    { id: 2, crops_name: '石榴', crops_identifier: 'plantingRadish', crops_harvest: '60', crops_probability: '20', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'shiliu' },
    { id: 3, crops_name: '红枣', crops_identifier: 'plantingPepper', crops_harvest: '50', crops_probability: '15', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'hongzao' },
    { id: 4, crops_name: '葡萄', crops_identifier: 'plantingWatermelon', crops_harvest: '50', crops_probability: '18', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'putao' },
    { id: 5, crops_name: '哈密瓜', crops_identifier: 'plantingHamiMelon', crops_harvest: '40', crops_probability: '15', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'hamigua' },
    { id: 6, crops_name: '香梨', crops_identifier: 'plantingFragrantPea', crops_harvest: '40', crops_probability: '20', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'xiangli' },
    { id: 7, crops_name: '沙漠果', crops_identifier: 'plantingDesertFruit', crops_harvest: '20', crops_probability: '20', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'shamoguo' },
    { id: 8, crops_name: '人参果', crops_identifier: 'plantingGinsengFruit', crops_harvest: '20', crops_probability: '15', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'rensheuguo' },
    { id: 9, crops_name: '薰衣草', crops_identifier: 'plantinglavender', crops_harvest: '20', crops_probability: '20', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'xunyichao' },
    { id: 10, crops_name: '沙漠人参', crops_identifier: 'plantingginseng', crops_harvest: '15', crops_probability: '20', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'shamorenshen' },
    { id: 11, crops_name: '巴旦木', crops_identifier: 'plantingalmonds', crops_harvest: '7', crops_probability: '20', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'badanmu' },
    { id: 12, crops_name: '和田玉', crops_identifier: 'plantingHetianJade', crops_harvest: '1', crops_probability: '0', crops_seed: '0.1', crops_sprout: '0.2', crops_grow: '0.3', crops_open_price: '1', name: 'hetianyu' },
  ];

  for (const crop of crops) {
    await prisma.cropsList.upsert({
      where: { id: crop.id },
      update: crop,
      create: crop,
    });
  }
  console.log('创建了 12 种作物');

  // 创建测试用户
  const testUser = await prisma.user.upsert({
    where: { id: 1001 },
    update: {},
    create: {
      id: 1001,
      username: 'demo',
      password: 'demo123',
      nickname: '测试用户',
      phone: '13800138000',
      status: 1,
      regtime: new Date(),
      logtime: new Date(),
      lognum: 1,
    },
  });
  console.log('创建了测试用户: demo');

  // 创建用户游戏数据
  await prisma.userlist.upsert({
    where: { userid: testUser.id },
    update: {},
    create: {
      userid: testUser.id!,
      username: 'demo',
      zhongzi: 100,
      gold: '10000',
      rmb: '0',
      lvl: 1,
      zs: '0',
      // 前3块土地已开垦
      zt1: '0',
      zt2: '0',
      zt3: '0',
      zt4: '-1',
      zt5: '-1',
      zt6: '-1',
      zt7: '-1',
      zt8: '-1',
      zt9: '-1',
      zt10: '-1',
      zt11: '-1',
      zt12: '-1',
      // 作物数量
      hetao: '0',
      hongzao: '0',
      putao: '0',
      hamigua: '0',
      shamoguo: '0',
      shiliu: '0',
      xiangli: '0',
      rensheuguo: '0',
    },
  });
  console.log('创建了用户游戏数据');

  // 创建商店商品
  const shopItems = [
    { name: '核桃种子', classid: 1, price: 100, inventory: -1, status: 1 },
    { name: '石榴种子', classid: 1, price: 100, inventory: -1, status: 1 },
    { name: '红枣种子', classid: 1, price: 150, inventory: -1, status: 1 },
    { name: '葡萄种子', classid: 1, price: 150, inventory: -1, status: 1 },
    { name: '哈密瓜种子', classid: 1, price: 200, inventory: -1, status: 1 },
    { name: '香梨种子', classid: 1, price: 200, inventory: -1, status: 1 },
    { name: '沙漠果种子', classid: 1, price: 300, inventory: -1, status: 1 },
    { name: '人参果种子', classid: 1, price: 500, inventory: -1, status: 1 },
  ];

  for (const item of shopItems) {
    await prisma.shopCommodityList.create({
      data: item,
    });
  }
  console.log('创建了 8 种商店商品');

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
