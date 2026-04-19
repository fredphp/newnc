-- =============================================
-- 开心农场 - 签到功能相关表结构
-- 数据库: SQLite / MySQL 通用
-- =============================================

-- ==================== 签到记录表 ====================
-- 用于记录每次签到的历史记录
CREATE TABLE IF NOT EXISTS `think_sign_record` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userid` INTEGER DEFAULT NULL COMMENT '用户ID',
  `username` VARCHAR(255) DEFAULT NULL COMMENT '用户名',
  `time` DATETIME DEFAULT NULL COMMENT '签到时间',
  `type` INTEGER DEFAULT 1 COMMENT '签到类型: 1=普通签到'
);

-- 签到记录表索引
CREATE INDEX IF NOT EXISTS `idx_sign_record_userid` ON `think_sign_record` (`userid`);
CREATE INDEX IF NOT EXISTS `idx_sign_record_time` ON `think_sign_record` (`time`);

-- ==================== 用户日志表 ====================
-- 用于记录用户的各种操作日志，包括签到
CREATE TABLE IF NOT EXISTS `think_user_log` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `userid` INTEGER NOT NULL COMMENT '用户ID',
  `username` VARCHAR(255) DEFAULT NULL COMMENT '用户名',
  `time` INTEGER NOT NULL COMMENT '记录时间戳',
  `record` TEXT NOT NULL COMMENT '记录内容',
  `score` FLOAT DEFAULT 0 COMMENT '积分变动',
  `source` INTEGER DEFAULT 0 COMMENT '来源: 0=任务, 1=邀请'
);

-- 用户日志表索引
CREATE INDEX IF NOT EXISTS `idx_user_log_userid` ON `think_user_log` (`userid`);
CREATE INDEX IF NOT EXISTS `idx_user_log_time` ON `think_user_log` (`time`);

-- ==================== 用户数据表 (签到相关字段) ====================
-- 注意: 这个表已经存在，以下是签到相关字段的说明
-- 
-- 签到相关字段:
-- `sign` INTEGER DEFAULT 0 - 连续签到天数
-- `sign_time` DATETIME DEFAULT NULL - 上次签到时间
--
-- 如果需要添加字段，请使用以下SQL:
-- ALTER TABLE `think_userlist` ADD COLUMN `sign` INTEGER DEFAULT 0;
-- ALTER TABLE `think_userlist` ADD COLUMN `sign_time` DATETIME DEFAULT NULL;

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

-- ==================== 示例数据 ====================
-- 插入测试签到记录
-- INSERT INTO `think_sign_record` (`userid`, `username`, `time`, `type`) 
-- VALUES (1, 'test_user', datetime('now'), 1);

-- 插入测试用户日志
-- INSERT INTO `think_user_log` (`userid`, `username`, `time`, `record`, `score`, `source`) 
-- VALUES (1, 'test_user', strftime('%s', 'now'), '签到成功，获得100金币', 100, 0);
