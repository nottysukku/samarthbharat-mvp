import { Pool, PoolClient } from 'pg';
import { logger } from '../utils/logger';

// ────────────── RDS PostgreSQL Connection ──────────────
// Database: samarthbharat on RDS PostgreSQL 15
// Instance: db.t3.micro with 7-day backup retention

const pool = new Pool({
  host: process.env.RDS_HOST || 'samarthbharat-postgres.cxxxxxxxxxxx.ap-south-1.rds.amazonaws.com',
  port: parseInt(process.env.RDS_PORT || '5432'),
  database: process.env.RDS_DATABASE || 'samarthbharat',
  user: process.env.RDS_USERNAME || 'samarthadmin',
  password: process.env.RDS_PASSWORD || 'SamarthBharat2026',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: process.env.RDS_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err: Error) => {
  logger.error('RDS PostgreSQL pool error:', err.message);
});

pool.on('connect', () => {
  logger.info('📊 Connected to RDS PostgreSQL');
});

// ────────────── Initialize Database Tables ──────────────
export async function initializeDatabase(): Promise<void> {
  let client: PoolClient | null = null;
  try {
    client = await pool.connect();

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(15) UNIQUE NOT NULL,
        name VARCHAR(100),
        user_type VARCHAR(20) NOT NULL DEFAULT 'farmer',
        language VARCHAR(10) DEFAULT 'hi',
        state VARCHAR(50),
        district VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE
      )
    `);

    // Scheme applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS scheme_applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        scheme_id VARCHAR(50) NOT NULL,
        scheme_name VARCHAR(200) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        documents JSONB DEFAULT '[]',
        notes TEXT
      )
    `);

    // Transactions / audit log
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        action VARCHAR(100) NOT NULL,
        resource VARCHAR(100),
        details JSONB DEFAULT '{}',
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sessions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        token VARCHAR(500) NOT NULL,
        device_info JSONB DEFAULT '{}',
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    logger.info('✅ RDS PostgreSQL tables initialized successfully');
  } catch (error: any) {
    logger.warn('RDS initialization skipped (connection not available):', error.message);
  } finally {
    if (client) client.release();
  }
}

// ────────────── User Operations ──────────────
export async function createUser(phone: string, userType: string, name?: string): Promise<any> {
  try {
    const result = await pool.query(
      `INSERT INTO users (phone, user_type, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (phone) DO UPDATE SET user_type = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [phone, userType, name || null]
    );
    return result.rows[0];
  } catch (error: any) {
    logger.error('RDS createUser error:', error.message);
    return null;
  }
}

export async function getUserByPhone(phone: string): Promise<any> {
  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    return result.rows[0] || null;
  } catch (error: any) {
    logger.error('RDS getUserByPhone error:', error.message);
    return null;
  }
}

// ────────────── Scheme Application Operations ──────────────
export async function createSchemeApplication(
  userId: number,
  schemeId: string,
  schemeName: string
): Promise<any> {
  try {
    const result = await pool.query(
      `INSERT INTO scheme_applications (user_id, scheme_id, scheme_name)
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, schemeId, schemeName]
    );
    return result.rows[0];
  } catch (error: any) {
    logger.error('RDS createSchemeApplication error:', error.message);
    return null;
  }
}

export async function getUserApplications(userId: number): Promise<any[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM scheme_applications WHERE user_id = $1 ORDER BY applied_at DESC',
      [userId]
    );
    return result.rows;
  } catch (error: any) {
    logger.error('RDS getUserApplications error:', error.message);
    return [];
  }
}

// ────────────── Audit Log ──────────────
export async function logAudit(
  userId: number | null,
  action: string,
  resource: string,
  details: any = {},
  ipAddress?: string
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO audit_logs (user_id, action, resource, details, ip_address)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, action, resource, JSON.stringify(details), ipAddress || null]
    );
  } catch (error: any) {
    logger.warn('RDS audit log error (non-fatal):', error.message);
  }
}

// ────────────── Health Check ──────────────
export async function checkRDSHealth(): Promise<{ status: string; latency: number }> {
  const start = Date.now();
  try {
    await pool.query('SELECT 1');
    return { status: 'healthy', latency: Date.now() - start };
  } catch (error: any) {
    return { status: 'unhealthy', latency: Date.now() - start };
  }
}

// ────────────── Connection Stats ──────────────
export function getPoolStats() {
  return {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  };
}

export { pool };
export default pool;
