import config from './config/config';
import app from './app';
import './jobs/uptimeChecker'; // registers cron job

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
