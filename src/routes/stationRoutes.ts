import { Router } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  const query = await pool.query('SELECT * FROM stations');
  res.json(query.rows);
});

export default router;
