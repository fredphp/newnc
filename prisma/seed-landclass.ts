import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建地块等级列表数据
  const landClasses = [
    {
      id: 1,
      landclass_name: '戈壁滩',
      landclass_level: '1',
      landclass_info: '',  // 等级1不需要升级材料
      landclass_crops: '核桃 + 石榴',
      land_img: null,
    },
    {
      id: 2,
      landclass_name: '盐碱地',
      landclass_level: '2',
      landclass_info: '',  // 等级2不需要升级材料
      landclass_crops: '核桃 + 石榴 + 红枣 + 葡萄',
      land_img: null,
    },
    {
      id: 3,
      landclass_name: '胶泥地',
      landclass_level: '3',
      landclass_info: '{"crops":"9:225;10:225","diamond":"300"}',  // 升级需要作物和钻石
      landclass_crops: '核桃 + 石榴 + 红枣 + 葡萄 + 哈密瓜 + 香梨',
      land_img: null,
    },
    {
      id: 4,
      landclass_name: '金沙地',
      landclass_level: '4',
      landclass_info: '{"crops":"14:300;15:300","diamond":"500"}',  // 升级需要更多作物和钻石
      landclass_crops: '核桃 + 石榴 + 红枣 + 葡萄 + 哈密瓜 + 香梨 + 沙漠果 + 人参果 + 薰衣草 + 沙漠人参 + 巴旦木 + 和田玉',
      land_img: null,
    },
  ];

  for (const landClass of landClasses) {
    await prisma.landClassList.upsert({
      where: { id: landClass.id },
      update: landClass,
      create: landClass,
    });
    console.log(`创建地块等级: ${landClass.landclass_name} (等级 ${landClass.landclass_level})`);
  }

  // 更新测试用户数据，确保 tudi1 默认为 1
  await prisma.userlist.update({
    where: { userid: 1 },
    data: {
      tudi1: 1,  // 第一块土地等级为1（戈壁滩）
      zt1: '0',  // 空地可播种
      bg1: 1,    // 默认解锁背景1
    },
  });
  console.log('已更新测试用户的土地数据');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
