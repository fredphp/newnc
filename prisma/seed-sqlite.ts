import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建测试用户
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      username: 'test',
      password: 'test', // 简单密码
      nickname: '测试用户',
      status: 1,
      regtime: new Date(),
      logtime: new Date(),
    },
  });

  console.log('创建用户:', user);

  // 创建用户游戏数据
  const userlist = await prisma.userlist.upsert({
    where: { userid: 1 },
    update: {},
    create: {
      userid: 1,
      username: 'test',
      gold: '1000',
      zs: '10',
      rmb: '0',
      lvl: 1,
      zhongzi: 5,
      fangwu: 1,  // 房屋等级
      hetao: '0',
      shiliu: '0',
      hongzao: '0',
      putao: '0',
      hamigua: '0',
      xiangli: '0',
      shamoguo: '0',
      renshenguo: '0',
      // 土地状态：tudi 字段直接对应图片编号
      // 0 = 未开垦（灰色土地），1 = 已开垦（亮色土地）
      tudi1: 1,   // 第一块土地已开垦
      tudi2: 0,   // 未开垦
      tudi3: 0,
      tudi4: 0,
      tudi5: 0,
      tudi6: 0,
      tudi7: 0,
      tudi8: 0,
      tudi9: 0,
      tudi10: 0,
      tudi11: 0,
      tudi12: 0,
      // 土地状态
      zt1: '0',   // 空地可播种
      zt2: '-1',  // 未开垦
      zt3: '-1',
      zt4: '-1',
      zt5: '-1',
      zt6: '-1',
      zt7: '-1',
      zt8: '-1',
      zt9: '-1',
      zt10: '-1',
      zt11: '-1',
      zt12: '-1',
    },
  });

  console.log('创建用户游戏数据:', userlist);
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
