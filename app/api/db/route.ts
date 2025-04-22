import { Pool } from 'pg';
import { NextResponse } from 'next/server';

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

// GET handler to check database connection
export async function GET() {
  try {
    await pool.query('SELECT NOW()');
    return NextResponse.json({ status: 'Connected to database' });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

// Make the pool available for other server components
export { pool };
