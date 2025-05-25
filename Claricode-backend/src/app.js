import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes.js'; // Make sure to include `.js`
import logger from './utils/logger.js';
import errorHandler from './utils/errorHandler.js';  // <-- Import errorHandler here

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Simple logger middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Register routes
app.use('/api', routes);

// Error handler (must be last middleware)
app.use(errorHandler);

export default app;
