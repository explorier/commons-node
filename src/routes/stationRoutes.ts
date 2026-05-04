import { Router } from 'express';
import { pool } from '../db';
import { Station, StationResponse } from '../types';

const formatStation = (row: Station): StationResponse => {
  const slug = row.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return {
    id: slug,
    name: row.name,
    callSign: row.call_sign,
    frequency: row.frequency,
    location: row.location,
    description: row.description,
    streamUrl: row.stream_url,
    website: row.website,
    coordinates: { lat: Number(row.lat), lng: Number(row.lng) },
    disableNowPlaying: row.disable_now_playing,
    channels: row.channels,
  };
};

const router = Router();

router.get('/', async (req, res) => {
  const query = await pool.query('SELECT * FROM stations');
  res.json(query.rows.map(formatStation));
});

router.get('/:id', async (req, res) => {
  const query = await pool.query('SELECT * FROM stations WHERE id = $1', [
    req.params.id,
  ]);

  if (query.rows.length === 0) {
    return res.status(404).json({ error: 'Station not found' });
  }

  res.json(formatStation(query.rows[0]));
});

export default router;
