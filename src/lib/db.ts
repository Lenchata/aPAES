import { Pool } from 'pg';

const dev = process.env.NODE_ENV === 'development';
export const log = (...args: any[]) => { if (dev) console.log('[DB]', ...args); };

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

if (!global._pgPool) {
  log('Creating pool →', process.env.POSTGRES_HOST);
  const connString = process.env.POSTGRES_URL_NON_POOLING!.replace(/[?&]sslmode=[^&]*/g, '');
  global._pgPool = new Pool({
    connectionString: connString,
    ssl: { rejectUnauthorized: false },
  });
  global._pgPool.on('connect', () => log('Connected ✓'));
  global._pgPool.on('error', (err) => console.error('[DB] Pool error:', err));
}

export const pool = global._pgPool;

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  log(sql.trim().split('\n')[0], params ?? '');
  const { rows } = await pool.query(sql, params);
  return rows;
}
