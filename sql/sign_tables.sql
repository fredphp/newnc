-- =============================================
-- 开心农场 - 签到功能相关表说明
-- 数据库: MySQL
-- =============================================
-- 
-- 重要说明：
-- 原项目 https://github.com/fredphp/nongchang.git 的 sql/shujuku.sql 
-- 已经包含了签到功能所需的所有表和字段，无需新增任何表！
--
-- 如果您使用的是原项目数据库，请跳过此文件。
-- =============================================

-- ==================== 签到记录表 (已存在于原项目) ====================
-- 原项目 shujuku.sql 中的表结构：
-- CREATE TABLE `think_sign_record` (
--   `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '签到ID',
--   `userid` int(10) unsigned DEFAULT NULL COMMENT '用户ID',
--   `username` varchar(20) DEFAULT NULL COMMENT '用户名',
--   `reward` int(10) unsigned DEFAULT NULL COMMENT '签到奖励',
--   `note` varchar(50) DEFAULT NULL COMMENT '签到记录',
--   `time` datetime DEFAULT NULL COMMENT '签到时间',
--   PRIMARY KEY (`id`)
-- ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='签到记录表';

-- ==================== 用户日志表 (已存在于原项目) ====================
-- 原项目 shujuku.sql 中的表结构：
-- CREATE TABLE `think_user_log` (
--   `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
--   `userid` int(10) NOT NULL COMMENT '用户ID',
--   `time` int(10) NOT NULL COMMENT '记录时间',
--   `record` varchar(255) NOT NULL COMMENT '记录内容',
--   `score` float(12,2) NOT NULL COMMENT '增减积分',
--   `username` varchar(50) NOT NULL COMMENT '用户名称',
--   `source` int(1) NOT NULL DEFAULT '0' COMMENT '0任务:1邀请',
--   PRIMARY KEY (`id`)
-- ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='积分记录表';

-- ==================== think_userlist 表签到字段 (已存在于原项目) ====================
-- 原项目 shujuku.sql 中的字段：
-- `sign` int(11) DEFAULT '0'           -- 连续签到天数
-- `sign_time` datetime DEFAULT NULL    -- 上次签到时间

-- ==================== 签到奖励配置说明 ====================
-- 签到奖励在代码中配置 (src/app/api/farm/sign/route.ts):
-- 
-- | 天数  | 金币  | 钻石 |
-- |-------|-------|------|
-- | 第1天 | 100   | 0    |
-- | 第2天 | 120   | 0    |
-- | 第3天 | 140   | 0    |
-- | 第4天 | 160   | 0    |
-- | 第5天 | 180   | 0    |
-- | 第6天 | 200   | 0    |
-- | 第7天 | 300   | 1    |
--
-- 第7天后循环，连续签到7天可获得300金币+1钻石

-- ==================== 使用说明 ====================
-- 如果您使用的是原项目的 shujuku.sql 数据库：
-- 1. 无需执行任何SQL语句，所有表已存在
-- 2. 直接使用签到功能即可
--
-- 如果您是从零开始创建数据库，请执行以下SQL：
-- 

-- ==================== 签到记录表 (MySQL版本) ====================
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

-- ==================== 用户日志表 (MySQL版本) ====================
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

-- ==================== 为 think_userlist 添加签到字段 (如果不存在) ====================
-- ALTER TABLE `think_userlist` ADD COLUMN `sign` int(11) DEFAULT 0 COMMENT '连续签到天数';
-- ALTER TABLE `think_userlist` ADD COLUMN `sign_time` datetime DEFAULT NULL COMMENT '上次签到时间';
