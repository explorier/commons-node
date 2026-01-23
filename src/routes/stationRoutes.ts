import { Router } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  const query = await pool.query('SELECT * FROM stations');
  res.json(query.rows);
});

router.get('/:id', async (req, res) => {
  const query = await pool.query('SELECT * FROM stations WHERE id = $1', [
    req.params.id,
  ]);

  if (query.rows.length === 0) {
    return res.status(404).json({ error: 'Station not found' });
  }

  res.json(query.rows[0]);
});

export default router;
