-- =============================================
-- 开心农场 - 完整数据库表结构
-- 数据库: SQLite
-- 来源: https://github.com/fredphp/nongchang.git
-- =============================================

-- ==================== 管理员表 ====================
CREATE TABLE IF NOT EXISTS `think_admin` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `loginip` VARCHAR(50) DEFAULT '',
  `logintime` INTEGER DEFAULT 0,
  `lock` INTEGER DEFAULT 0
);

-- ==================== 用户表 ====================
CREATE TABLE IF NOT EXISTS `think_user` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` VARCHAR(255) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT '',
  `nickname` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `QQ` VARCHAR(20) DEFAULT NULL,
  `weixin` VARCHAR(100) DEFAULT NULL,
  `zfb` VARCHAR(100) DEFAULT NULL,
  `realname` VARCHAR(50) DEFAULT NULL,
  `idcard` VARCHAR(20) DEFAULT NULL,
  `regtime` DATETIME DEFAULT NULL,
  `logtime` DATETIME DEFAULT NULL,
  `lognum` INTEGER DEFAULT NULL,
  `logip` VARCHAR(50) DEFAULT NULL,
  `RegIP` VARCHAR(50) DEFAULT NULL,
  `status` INTEGER DEFAULT 1,
  `remark` TEXT DEFAULT NULL,
  `upxianid` INTEGER DEFAULT NULL,
  `upxianuser` VARCHAR(255) DEFAULT NULL,
  `UserEndsNum` INTEGER DEFAULT NULL
);

-- ==================== 用户游戏数据表 (核心表) ====================
CREATE TABLE IF NOT EXISTS `think_userlist` (
  `ID` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userid` INTEGER NOT NULL UNIQUE,
  `username` VARCHAR(255) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  
  -- 基础属性
  `zhongzi` INTEGER DEFAULT 0,
  `gold` VARCHAR(50) DEFAULT '0',
  `rmb` VARCHAR(50) DEFAULT '0',
  `lvl` INTEGER DEFAULT 1,
  `zs` VARCHAR(50) DEFAULT '0',
  `dong` VARCHAR(50) DEFAULT '0',
  
  -- 12块土地状态
  `zt1` VARCHAR(10) DEFAULT '-1',
  `zt2` VARCHAR(10) DEFAULT '-1',
  `zt3` VARCHAR(10) DEFAULT '-1',
  `zt4` VARCHAR(10) DEFAULT '-1',
  `zt5` VARCHAR(10) DEFAULT '-1',
  `zt6` VARCHAR(10) DEFAULT '-1',
  `zt7` VARCHAR(10) DEFAULT '-1',
  `zt8` VARCHAR(10) DEFAULT '-1',
  `zt9` VARCHAR(10) DEFAULT '-1',
  `zt10` VARCHAR(10) DEFAULT '-1',
  `zt11` VARCHAR(10) DEFAULT '-1',
  `zt12` VARCHAR(10) DEFAULT '-1',
  
  -- 土地开垦状态
  `tudi1` INTEGER DEFAULT 0,
  `tudi2` INTEGER DEFAULT 0,
  `tudi3` INTEGER DEFAULT 0,
  `tudi4` INTEGER DEFAULT 0,
  `tudi5` INTEGER DEFAULT 0,
  `tudi6` INTEGER DEFAULT 0,
  `tudi7` INTEGER DEFAULT 0,
  `tudi8` INTEGER DEFAULT 0,
  `tudi9` INTEGER DEFAULT 0,
  `tudi10` INTEGER DEFAULT 0,
  `tudi11` INTEGER DEFAULT 0,
  `tudi12` INTEGER DEFAULT 0,
  
  -- 各块土地开垦时间
  `kttime1` DATETIME DEFAULT NULL,
  `kttime2` DATETIME DEFAULT NULL,
  `kttime3` DATETIME DEFAULT NULL,
  `kttime4` DATETIME DEFAULT NULL,
  `kttime5` DATETIME DEFAULT NULL,
  `kttime6` DATETIME DEFAULT NULL,
  `kttime7` DATETIME DEFAULT NULL,
  `kttime8` DATETIME DEFAULT NULL,
  `kttime9` DATETIME DEFAULT NULL,
  `kttime10` DATETIME DEFAULT NULL,
  `kttime11` DATETIME DEFAULT NULL,
  `kttime12` DATETIME DEFAULT NULL,
  
  -- 作物收获数量
  `hetao` VARCHAR(50) DEFAULT '0',
  `hongzao` VARCHAR(50) DEFAULT '0',
  `putao` VARCHAR(50) DEFAULT '0',
  `hamigua` VARCHAR(50) DEFAULT '0',
  `shamoguo` VARCHAR(50) DEFAULT '0',
  `shiliu` VARCHAR(50) DEFAULT '0',
  `xiangli` VARCHAR(50) DEFAULT '0',
  `rensheuguo` VARCHAR(50) DEFAULT '0',
  `xunyichao` VARCHAR(50) DEFAULT '0',
  `shamorenshen` VARCHAR(50) DEFAULT '0',
  `badanmu` VARCHAR(50) DEFAULT '0',
  `hetianyu` VARCHAR(50) DEFAULT '0',
  
  -- 道具
  `chutou` VARCHAR(50) DEFAULT '10',
  `jinyan` VARCHAR(50) DEFAULT '0',
  `muban` INTEGER DEFAULT 0,
  `shitou` INTEGER DEFAULT 0,
  `gangchai` INTEGER DEFAULT 0,
  
  -- 宝石
  `lvbaoshi` INTEGER DEFAULT 0,
  `shashuihu` INTEGER DEFAULT 0,
  `yinbaoxiang` INTEGER DEFAULT 0,
  `chuchaoji` INTEGER DEFAULT 0,
  `shichaosx` INTEGER DEFAULT 0,
  `tuchongsx` INTEGER DEFAULT 0,
  `yulusx` INTEGER DEFAULT 0,
  `zhhibaoshi` INTEGER DEFAULT 0,
  `lanbaoshi` INTEGER DEFAULT 0,
  `huangbaoshi` INTEGER DEFAULT 0,
  `fengshousx` INTEGER DEFAULT 0,
  
  -- 背景解锁
  `bg1` INTEGER DEFAULT 1,
  `bg2` INTEGER DEFAULT 0,
  `bg3` INTEGER DEFAULT 0,
  
  -- 房屋
  `fangwu` INTEGER DEFAULT 1,
  
  -- 签到相关
  `sign` INTEGER DEFAULT 0,
  `sign_time` DATETIME DEFAULT NULL,
  
  -- 其他字段...
  `logtime` DATETIME DEFAULT NULL,
  `lognum` INTEGER DEFAULT 1,
  `islogin` VARCHAR(10) DEFAULT '1'
);

-- ==================== 签到记录表 ====================
CREATE TABLE IF NOT EXISTS `think_sign_record` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userid` INTEGER DEFAULT NULL,
  `username` VARCHAR(255) DEFAULT NULL,
  `time` DATETIME DEFAULT NULL,
  `type` INTEGER DEFAULT 1
);

-- ==================== 用户日志表 ====================
CREATE TABLE IF NOT EXISTS `think_user_log` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userid` INTEGER NOT NULL,
  `username` VARCHAR(255) DEFAULT NULL,
  `time` INTEGER NOT NULL,
  `record` TEXT NOT NULL,
  `score` FLOAT DEFAULT 0,
  `source` INTEGER DEFAULT 0
);

-- ==================== 作物列表 ====================
CREATE TABLE IF NOT EXISTS `think_crops_list` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `crops_name` VARCHAR(100) DEFAULT NULL,
  `crops_identifier` VARCHAR(100) DEFAULT NULL,
  `crops_land_count` INTEGER DEFAULT NULL,
  `crops_harvest` VARCHAR(50) DEFAULT NULL,
  `crops_probability` VARCHAR(50) DEFAULT NULL,
  `crops_seed` VARCHAR(50) DEFAULT NULL,
  `crops_sprout` VARCHAR(50) DEFAULT NULL,
  `crops_grow` VARCHAR(50) DEFAULT NULL,
  `crops_open_price` VARCHAR(50) DEFAULT NULL,
  `name` VARCHAR(100) DEFAULT NULL
);

-- ==================== 宠物列表 ====================
CREATE TABLE IF NOT EXISTS `think_pet_list` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `pet_name` VARCHAR(100) DEFAULT NULL,
  `pet_score` VARCHAR(50) DEFAULT NULL,
  `pet_identifier` VARCHAR(100) DEFAULT NULL,
  `pet_attack` VARCHAR(50) DEFAULT NULL,
  `pet_defense` VARCHAR(50) DEFAULT NULL,
  `pet_speed` VARCHAR(50) DEFAULT NULL,
  `pet_luck` VARCHAR(50) DEFAULT NULL,
  `pet_life` VARCHAR(50) DEFAULT NULL,
  `pet_description` TEXT DEFAULT NULL
);

-- ==================== 房屋列表 ====================
CREATE TABLE IF NOT EXISTS `think_house_list` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `house_name` VARCHAR(100) DEFAULT NULL,
  `house_level` VARCHAR(50) DEFAULT NULL,
  `house_info` TEXT DEFAULT NULL,
  `house_description` TEXT DEFAULT NULL
);

-- ==================== 地块等级列表 ====================
CREATE TABLE IF NOT EXISTS `think_land_class_list` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `landclass_name` VARCHAR(100) DEFAULT NULL,
  `landclass_level` VARCHAR(50) DEFAULT NULL,
  `landclass_info` TEXT DEFAULT NULL,
  `landclass_crops` TEXT DEFAULT NULL,
  `land_img` VARCHAR(255) DEFAULT NULL
);

-- ==================== 游戏配置 ====================
CREATE TABLE IF NOT EXISTS `think_game_config` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `config_till_price` INTEGER DEFAULT NULL,
  `config_eradicate_price` INTEGER DEFAULT NULL,
  `config_seed_count` INTEGER DEFAULT NULL,
  `config_sign_in` INTEGER DEFAULT NULL,
  `config_register_reward` INTEGER DEFAULT NULL,
  `config_steal_count` INTEGER DEFAULT NULL,
  `config_pest_time` VARCHAR(50) DEFAULT '0.1',
  `config_pest_odds` INTEGER DEFAULT 20,
  `config_pest_reduce` INTEGER DEFAULT 5,
  `config_drought_time` VARCHAR(50) DEFAULT '0.1',
  `config_drought_odds` INTEGER DEFAULT 20,
  `config_drought_reduce` INTEGER DEFAULT 8,
  `config_weed_time` INTEGER DEFAULT 5,
  `config_weed_odds` INTEGER DEFAULT 5,
  `config_weed_reduce` INTEGER DEFAULT 5
);

-- ==================== 商店分类 ====================
CREATE TABLE IF NOT EXISTS `think_shop_class_list` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` VARCHAR(100) DEFAULT NULL,
  `sort` INTEGER DEFAULT 0,
  `status` INTEGER DEFAULT 1
);

-- ==================== 商店商品 ====================
CREATE TABLE IF NOT EXISTS `think_shop_commodity_list` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` VARCHAR(100) DEFAULT NULL,
  `classid` INTEGER DEFAULT NULL,
  `price` INTEGER DEFAULT NULL,
  `originalPrice` INTEGER DEFAULT NULL,
  `inventory` INTEGER DEFAULT NULL,
  `sales` INTEGER DEFAULT NULL,
  `pic` VARCHAR(255) DEFAULT NULL,
  `status` INTEGER DEFAULT 1,
  `description` TEXT DEFAULT NULL,
  `sort` INTEGER DEFAULT 0
);

-- ==================== 公告表 ====================
CREATE TABLE IF NOT EXISTS `think_notice` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` VARCHAR(255) DEFAULT NULL,
  `content` TEXT DEFAULT NULL,
  `time` DATETIME DEFAULT NULL,
  `status` INTEGER DEFAULT 1
);

-- ==================== 索引 ====================
CREATE INDEX IF NOT EXISTS `idx_userlist_userid` ON `think_userlist` (`userid`);
CREATE INDEX IF NOT EXISTS `idx_sign_record_userid` ON `think_sign_record` (`userid`);
CREATE INDEX IF NOT EXISTS `idx_user_log_userid` ON `think_user_log` (`userid`);
