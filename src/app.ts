import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import stationRoutes from './routes/stationRoutes';
import cors from 'cors';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') ?? [];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.use('/stations', stationRoutes);

app.use(errorHandler);

export default app;
