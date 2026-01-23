import cron from 'node-cron';
import { pool } from '../db';
import { Station } from '../types';

// TODO: Some stations (e.g., WRIR) are behind Cloudflare bot protection
// and may return 403. If User-Agent header doesn't help, options:
// - Add skip_uptime_check column to stations table
// - Mark stations with known issues in the database

const checkStation = async (station: Pick<Station, 'id' | 'stream_url'>) => {
  const start = Date.now();

  let isUp = false;
  let errorMessage: string | null = null;

  try {
    const response = await fetch(station.stream_url, {
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CommonsRadio/1.0; +https://github.com/explorier/commons)',
      },
    });
    isUp = response.ok;
  } catch (err) {
    isUp = false;
    errorMessage = err instanceof Error ? err.message : 'Unknown error';
  }

  const responseTime = Date.now() - start;

  await pool.query(
    `INSERT INTO uptime_logs (station_id, is_up, response_time_ms, error_message) VALUES ($1, $2, $3, $4)`,
    [station.id, isUp, responseTime, errorMessage],
  );

  console.log(`${station.id}: ${isUp ? 'UP' : 'DOWN'} (${responseTime}ms)`);
};

const checkAllStations = async () => {
  console.log('Starting uptime check...');

  const result = await pool.query<Pick<Station, 'id' | 'stream_url'>>(
    'SELECT id, stream_url FROM stations',
  );

  await Promise.all(result.rows.map(checkStation));

  console.log('Uptime check complete.');
};

cron.schedule('0 0 * * *', checkAllStations);

export { checkAllStations };
