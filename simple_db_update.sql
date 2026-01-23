-- Simple database update for teacher profile
-- Run these commands one by one in your MySQL client

-- Add role column if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role ENUM('student', 'teacher', 'admin') DEFAULT 'student' AFTER password_hash;

-- Add profile columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20) AFTER email;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT AFTER phone;
ALTER TABLE users ADD COLUMN IF NOT EXISTS qualifications TEXT AFTER bio;
ALTER TABLE users ADD COLUMN IF NOT EXISTS experience TEXT AFTER qualifications;
ALTER TABLE users ADD COLUMN IF NOT EXISTS specialization VARCHAR(255) AFTER experience;

-- Create index on role
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
