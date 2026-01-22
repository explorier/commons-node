import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import stationRoutes from './routes/stationRoutes';

const app = express();

app.use(express.json());

app.use('/stations', stationRoutes);

app.use(errorHandler);

export default app;
