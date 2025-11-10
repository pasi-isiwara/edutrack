import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 28222,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

// Function to test database connection
export const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('✓ Database connection successful!');
    console.log(`✓ Connected to database: ${process.env.DB_NAME}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('✗ Database connection failed!');
    console.error('Error details:', error.message);
    return false;
  }
};

export default db;
