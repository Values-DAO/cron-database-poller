import dotenv from 'dotenv';
import axios from 'axios';
import { logger } from './utils/logger';
import cron from 'node-cron';
import { config } from './config';

dotenv.config();

let isPrevCronRunning = false;

const callBotService = async () => {
  // Skip if previous job is still running
  if (isPrevCronRunning) {
    logger.info('Previous job is still running, skipping this run');
    return;
  }
  
  try {
    isPrevCronRunning = true;
    logger.info("Running cron job: Calling bot service to poll database...");
    
    const res = await axios.post(
      `${config.telegramApi}/api/poll-database`,
      {},
      {
        headers: {
          "x-api-key": process.env.CRON_API_KEY,
        },
      }
    );
    
    if (res.status === 200) {
      logger.info('Bot service successfully polled database');
    } else {
      logger.error('Error while polling database');
    }
  } catch (error) {
    logger.error(`Error while polling database: ${error}`);
  } finally {
    isPrevCronRunning = false;
  }
}

// Run the cron job every 5 minutes
cron.schedule('*/2 * * * *', callBotService);

// callBotService();