'use server';

import { Pool } from 'pg';
import { cookies } from 'next/headers';

// Create a new pool instance
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE,
  ssl: process.env.POSTGRES_SSL === 'true' ? {
    rejectUnauthorized: false
  } : undefined
});

// Helper function to run queries
export async function query<T>(text: string, params?: any[]): Promise<T[]> {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Function to test database connection
export async function testConnection() {
  try {
    await pool.query('SELECT NOW()');
    return { success: true, message: 'Connected to database' };
  } catch (error) {
    console.error('Database connection error:', error);
    return { success: false, message: 'Database connection failed' };
  }
}

// Export pool for use in other server components
export { pool };
