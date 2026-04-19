-- =============================================
-- 开心农场 - 完整数据库表结构
-- 数据库: MySQL
-- 来源: https://github.com/fredphp/nongchang.git
-- =============================================

-- ==================== 管理员表 ====================
CREATE TABLE IF NOT EXISTS `think_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `loginip` char(15) NOT NULL COMMENT '登录ip',
  `logintime` int(10) NOT NULL COMMENT '登录时间',
  `lock` int(1) NOT NULL DEFAULT '0' COMMENT '0为正常，1为锁定',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ==================== 用户表 ====================
CREATE TABLE IF NOT EXISTS `think_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(32) DEFAULT '',
  `nickname` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `QQ` varchar(20) DEFAULT NULL,
  `weixin` varchar(100) DEFAULT NULL,
  `zfb` varchar(100) DEFAULT NULL,
  `realname` varchar(50) DEFAULT NULL,
  `idcard` varchar(20) DEFAULT NULL,
  `regtime` datetime DEFAULT NULL,
  `logtime` datetime DEFAULT NULL,
  `lognum` int(10) DEFAULT NULL,
  `logip` varchar(50) DEFAULT NULL,
  `RegIP` varchar(50) DEFAULT NULL,
  `status` int(1) DEFAULT 1,
  `remark` text DEFAULT NULL,
  `upxianid` int(10) DEFAULT NULL,
  `upxianuser` varchar(50) DEFAULT NULL,
  `UserEndsNum` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ==================== 用户游戏数据表 (核心表) ====================
CREATE TABLE IF NOT EXISTS `think_userlist` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  
  -- 基础属性
  `zhongzi` int(10) DEFAULT 0 COMMENT '种子数量',
  `gold` varchar(10) DEFAULT '0' COMMENT '金币',
  `rmb` varchar(10) DEFAULT '0' COMMENT '人民币',
  `lvl` int(11) DEFAULT 1 COMMENT '等级',
  `zs` varchar(10) DEFAULT '0' COMMENT '钻石',
  `dong` varchar(10) DEFAULT '0' COMMENT '冻结',
  
  -- 12块土地状态 (-1=未开垦, 0=空地, 1-12=种植的作物ID)
  `zt1` varchar(11) DEFAULT '-1',
  `zt2` varchar(11) DEFAULT '-1',
  `zt3` varchar(10) DEFAULT '-1',
  `zt4` varchar(10) DEFAULT '-1',
  `zt5` varchar(10) DEFAULT '-1',
  `zt6` varchar(8) DEFAULT '-1',
  `zt7` varchar(10) DEFAULT '-1',
  `zt8` varchar(10) DEFAULT '-1',
  `zt9` varchar(10) DEFAULT '-1',
  `zt10` varchar(10) DEFAULT '-1',
  `zt11` varchar(10) DEFAULT '-1',
  `zt12` varchar(10) DEFAULT '-1',
  
  -- 土地开垦状态 (0=未开垦, 1=已开垦)
  `tudi1` int(11) DEFAULT 0,
  `tudi2` int(11) DEFAULT 0,
  `tudi3` int(11) DEFAULT 0,
  `tudi4` int(11) DEFAULT 0,
  `tudi5` int(11) DEFAULT 0,
  `tudi6` int(11) DEFAULT 0,
  `tudi7` int(11) DEFAULT 0,
  `tudi8` int(11) DEFAULT 0,
  `tudi9` int(11) DEFAULT 0,
  `tudi10` int(11) DEFAULT 0,
  `tudi11` int(11) DEFAULT 0,
  `tudi12` int(11) DEFAULT 0,
  
  -- 各块土地的开垦/种植时间
  `kttime1` datetime DEFAULT NULL,
  `kttime2` datetime DEFAULT NULL,
  `kttime3` datetime DEFAULT NULL,
  `kttime4` datetime DEFAULT NULL,
  `kttime5` datetime DEFAULT NULL,
  `kttime6` datetime DEFAULT NULL,
  `kttime7` datetime DEFAULT NULL,
  `kttime8` datetime DEFAULT NULL,
  `kttime9` datetime DEFAULT NULL,
  `kttime10` datetime DEFAULT NULL,
  `kttime11` datetime DEFAULT NULL,
  `kttime12` datetime DEFAULT NULL,
  
  -- 作物收获数量
  `hetao` varchar(11) DEFAULT '0' COMMENT '核桃',
  `hongzao` varchar(11) DEFAULT '0' COMMENT '红枣',
  `putao` varchar(11) DEFAULT '0' COMMENT '葡萄',
  `hamigua` varchar(11) DEFAULT '0' COMMENT '哈密瓜',
  `shamoguo` varchar(11) DEFAULT '0' COMMENT '沙漠果',
  `shiliu` varchar(11) DEFAULT '0' COMMENT '石榴',
  `xiangli` varchar(11) DEFAULT '0' COMMENT '香梨',
  `renshenguo` varchar(11) DEFAULT '0' COMMENT '人参果',
  `xunyichao` varchar(11) DEFAULT '0' COMMENT '薰衣草',
  `shamorenshen` varchar(11) DEFAULT '0' COMMENT '沙漠人参',
  `badanmu` varchar(11) DEFAULT '0' COMMENT '巴旦木',
  `hetianyu` varchar(11) DEFAULT '0' COMMENT '和田玉',
  
  -- 道具
  `chutou` varchar(11) DEFAULT '10' COMMENT '锄头',
  `jinyan` varchar(10) DEFAULT '0' COMMENT '金眼',
  `muban` int(11) DEFAULT 0 COMMENT '木板',
  `shitou` int(11) DEFAULT 0 COMMENT '石头',
  `gangchai` int(11) DEFAULT 0 COMMENT '钢材',
  
  -- 宝石
  `lvbaoshi` int(11) DEFAULT 0 COMMENT '绿宝石',
  `shashuihu` int(11) DEFAULT 0 COMMENT '杀水壶',
  `yinbaoxiang` int(11) DEFAULT 0 COMMENT '银宝箱',
  `chuchaoji` int(11) DEFAULT 0 COMMENT '除草剂',
  `shichaosx` int(11) DEFAULT 0 COMMENT '虫草生长剂',
  `tuchongsx` int(11) DEFAULT 0 COMMENT '土虫生长剂',
  `yulusx` int(11) DEFAULT 0 COMMENT '雨露生长剂',
  `zhhibaoshi` int(11) DEFAULT 0 COMMENT '智慧宝石',
  `lanbaoshi` int(11) DEFAULT 0 COMMENT '蓝宝石',
  `huangbaoshi` int(11) DEFAULT 0 COMMENT '黄宝石',
  `fengshousx` int(11) DEFAULT 0 COMMENT '丰收生长剂',
  
  -- 背景解锁
  `bg1` int(11) DEFAULT 1,
  `bg2` int(11) DEFAULT 0,
  `bg3` int(11) DEFAULT 0,
  
  -- 房屋
  `fangwu` int(11) DEFAULT 1 COMMENT '房屋等级',
  
  -- 签到相关
  `sign` int(11) DEFAULT 0 COMMENT '连续签到天数',
  `sign_time` datetime DEFAULT NULL COMMENT '上次签到时间',
  
  -- 其他
  `logtime` datetime DEFAULT NULL,
  `lognum` int(10) DEFAULT 1,
  `islogin` varchar(10) DEFAULT '1',
  `jypwd` varchar(11) DEFAULT NULL COMMENT '交易密码',
  `upxianname` varchar(8) DEFAULT '0',
  `upxianid` int(10) DEFAULT 0,
  `upxianuser` varchar(10) DEFAULT NULL,
  `zfb` varchar(20) DEFAULT '0',
  `weixin` varchar(20) DEFAULT '0',
  `phone` varchar(20) DEFAULT '0',
  `qq` varchar(20) DEFAULT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  `pay_zt` int(11) DEFAULT 1,
  `status` int(11) DEFAULT 1,
  
  PRIMARY KEY (`ID`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户游戏数据表';

-- ==================== 签到记录表 ====================
CREATE TABLE IF NOT EXISTS `think_sign_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '签到ID',
  `userid` int(10) unsigned DEFAULT NULL COMMENT '用户ID',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `reward` int(10) unsigned DEFAULT NULL COMMENT '签到奖励',
  `note` varchar(50) DEFAULT NULL COMMENT '签到记录',
  `time` datetime DEFAULT NULL COMMENT '签到时间',
  `type` int(1) DEFAULT 1 COMMENT '签到类型: 1=普通签到',
  PRIMARY KEY (`id`),
  KEY `idx_userid` (`userid`),
  KEY `idx_time` (`time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='签到记录表';

-- ==================== 用户日志表 ====================
CREATE TABLE IF NOT EXISTS `think_user_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `userid` int(10) NOT NULL COMMENT '用户ID',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `time` int(10) NOT NULL COMMENT '记录时间戳',
  `record` varchar(255) NOT NULL COMMENT '记录内容',
  `score` float(12,2) DEFAULT 0 COMMENT '积分变动',
  `source` int(1) NOT NULL DEFAULT '0' COMMENT '0任务:1邀请',
  PRIMARY KEY (`id`),
  KEY `idx_userid` (`userid`),
  KEY `idx_time` (`time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='积分记录表';

-- ==================== 作物列表 ====================
CREATE TABLE IF NOT EXISTS `think_crops_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `crops_name` varchar(100) DEFAULT NULL COMMENT '作物名称',
  `crops_identifier` varchar(100) DEFAULT NULL COMMENT '标识符',
  `crops_land_count` int(10) DEFAULT NULL COMMENT '种植数量',
  `crops_harvest` varchar(50) DEFAULT NULL COMMENT '收获时间(小时)',
  `crops_probability` varchar(50) DEFAULT NULL COMMENT '收获概率',
  `crops_seed` varchar(50) DEFAULT NULL COMMENT '种子阶段时间',
  `crops_sprout` varchar(50) DEFAULT NULL COMMENT '发芽阶段时间',
  `crops_grow` varchar(50) DEFAULT NULL COMMENT '生长阶段时间',
  `crops_open_price` varchar(50) DEFAULT NULL COMMENT '开垦价格',
  `name` varchar(100) DEFAULT NULL COMMENT '英文名',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='作物列表';

-- ==================== 宠物列表 ====================
CREATE TABLE IF NOT EXISTS `think_pet_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_name` varchar(100) DEFAULT NULL COMMENT '宠物名称',
  `pet_score` varchar(50) DEFAULT NULL COMMENT '宠物评分',
  `pet_identifier` varchar(100) DEFAULT NULL COMMENT '标识符',
  `pet_attack` varchar(50) DEFAULT NULL COMMENT '攻击力',
  `pet_defense` varchar(50) DEFAULT NULL COMMENT '防御力',
  `pet_speed` varchar(50) DEFAULT NULL COMMENT '速度',
  `pet_luck` varchar(50) DEFAULT NULL COMMENT '幸运',
  `pet_life` varchar(50) DEFAULT NULL COMMENT '生命',
  `pet_description` text DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='宠物列表';

-- ==================== 房屋列表 ====================
CREATE TABLE IF NOT EXISTS `think_house_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `house_name` varchar(100) DEFAULT NULL COMMENT '房屋名称',
  `house_level` varchar(50) DEFAULT NULL COMMENT '房屋等级',
  `house_info` text DEFAULT NULL COMMENT '房屋信息',
  `house_description` text DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='房屋列表';

-- ==================== 地块等级列表 ====================
CREATE TABLE IF NOT EXISTS `think_land_class_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `landclass_name` varchar(100) DEFAULT NULL COMMENT '地块名称',
  `landclass_level` varchar(50) DEFAULT NULL COMMENT '地块等级',
  `landclass_info` text DEFAULT NULL COMMENT '升级所需材料JSON',
  `landclass_crops` text DEFAULT NULL COMMENT '可种植作物列表',
  `land_img` varchar(255) DEFAULT NULL COMMENT '地块图片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='地块等级列表';

-- ==================== 游戏配置 ====================
CREATE TABLE IF NOT EXISTS `think_game_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config_till_price` int(10) DEFAULT NULL COMMENT '耕地价格',
  `config_eradicate_price` int(10) DEFAULT NULL COMMENT '铲除价格',
  `config_seed_count` int(10) DEFAULT NULL COMMENT '种子数量',
  `config_sign_in` int(10) DEFAULT NULL COMMENT '签到奖励',
  `config_register_reward` int(10) DEFAULT NULL COMMENT '注册奖励',
  `config_steal_count` int(10) DEFAULT NULL COMMENT '偷取次数',
  `config_pest_time` varchar(50) DEFAULT '0.1' COMMENT '虫害时间',
  `config_pest_odds` int(11) DEFAULT 20 COMMENT '虫害概率',
  `config_pest_reduce` int(11) DEFAULT 5 COMMENT '虫害减少',
  `config_drought_time` varchar(50) DEFAULT '0.1' COMMENT '干旱时间',
  `config_drought_odds` int(11) DEFAULT 20 COMMENT '干旱概率',
  `config_drought_reduce` int(11) DEFAULT 8 COMMENT '干旱减少',
  `config_weed_time` int(11) DEFAULT 5 COMMENT '杂草时间',
  `config_weed_odds` int(11) DEFAULT 5 COMMENT '杂草概率',
  `config_weed_reduce` int(11) DEFAULT 5 COMMENT '杂草减少',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='游戏配置表';

-- ==================== 商店分类 ====================
CREATE TABLE IF NOT EXISTS `think_shop_class_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '分类名称',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `status` int(11) DEFAULT 1 COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商店分类';

-- ==================== 商店商品 ====================
CREATE TABLE IF NOT EXISTS `think_shop_commodity_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '商品名称',
  `classid` int(11) DEFAULT NULL COMMENT '分类ID',
  `price` int(11) DEFAULT NULL COMMENT '价格',
  `originalPrice` int(11) DEFAULT NULL COMMENT '原价',
  `inventory` int(11) DEFAULT NULL COMMENT '库存',
  `sales` int(11) DEFAULT NULL COMMENT '销量',
  `pic` varchar(255) DEFAULT NULL COMMENT '图片',
  `status` int(11) DEFAULT 1 COMMENT '状态',
  `description` text DEFAULT NULL COMMENT '描述',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商店商品';

-- ==================== 公告表 ====================
CREATE TABLE IF NOT EXISTS `think_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `content` text DEFAULT NULL COMMENT '内容',
  `time` datetime DEFAULT NULL COMMENT '发布时间',
  `status` int(11) DEFAULT 1 COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='公告表';

-- ==================== 文章表 ====================
CREATE TABLE IF NOT EXISTS `think_article` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `author` char(30) NOT NULL COMMENT '作者',
  `releasetime` int(10) NOT NULL COMMENT '发布时间',
  `modifiedtime` int(10) NOT NULL COMMENT '修改时间',
  `title` varchar(50) NOT NULL COMMENT '文章标题',
  `content` text NOT NULL COMMENT '文章内容',
  `browsenum` int(10) NOT NULL COMMENT '浏览次数',
  `classid` int(5) NOT NULL COMMENT '文章分类ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='文章表';

-- ==================== 文章分类表 ====================
CREATE TABLE IF NOT EXISTS `think_articleclass` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `classname` varchar(30) NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `classname` (`classname`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='文章分类表';

-- ==================== 用户背包 ====================
CREATE TABLE IF NOT EXISTS `think_userbag` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '物品名称',
  `num` int(11) DEFAULT NULL COMMENT '数量',
  `dq_time` datetime DEFAULT NULL COMMENT '到期时间',
  `userid` int(11) DEFAULT NULL COMMENT '用户ID',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `buy_time` datetime DEFAULT NULL COMMENT '购买时间'
) ENGINE=MyISAM DEFAULT CHARSET=gbk COMMENT='用户背包';

-- ==================== 游戏记录 ====================
CREATE TABLE IF NOT EXISTS `think_game_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL COMMENT '用户ID',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `game_time` datetime DEFAULT NULL COMMENT '游戏时间',
  `recharge` int(11) DEFAULT NULL COMMENT '充值金额',
  `recharge_money` int(11) DEFAULT NULL COMMENT '充值金额',
  `fc` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_userid` (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='游戏记录';
