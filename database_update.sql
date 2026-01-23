-- =====================================================
-- EduTrack: Extend users table for teacher profiles
-- MySQL 8+ compatible (Aiven)
-- Safe to run multiple times
-- =====================================================

-- -------------------------
-- PHONE
-- -------------------------
SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'phone'
);

SET @sql := IF(@exists = 0,
  'ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


-- -------------------------
-- BIO
-- -------------------------
SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'bio'
);

SET @sql := IF(@exists = 0,
  'ALTER TABLE users ADD COLUMN bio TEXT AFTER phone',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


-- -------------------------
-- QUALIFICATIONS
-- -------------------------
SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'qualifications'
);

SET @sql := IF(@exists = 0,
  'ALTER TABLE users ADD COLUMN qualifications TEXT AFTER bio',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


-- -------------------------
-- EXPERIENCE
-- -------------------------
SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'experience'
);

SET @sql := IF(@exists = 0,
  'ALTER TABLE users ADD COLUMN experience TEXT AFTER qualifications',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


-- -------------------------
-- SPECIALIZATION
-- -------------------------
SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'specialization'
);

SET @sql := IF(@exists = 0,
  'ALTER TABLE users ADD COLUMN specialization VARCHAR(255) AFTER experience',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


-- -------------------------
-- ROLE
-- -------------------------
SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'role'
);

SET @sql := IF(@exists = 0,
  'ALTER TABLE users ADD COLUMN role ENUM("student","teacher","admin") DEFAULT "student" AFTER password_hash',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


-- -------------------------
-- INDEX ON ROLE
-- -------------------------
SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND INDEX_NAME = 'idx_users_role'
);

SET @sql := IF(@exists = 0,
  'CREATE INDEX idx_users_role ON users(role)',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
