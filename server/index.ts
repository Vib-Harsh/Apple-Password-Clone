import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import helmet from 'helmet';     //---- Its help up to apply security on HTTP request. 
import cors from 'cors';         //---- Its allow cross-origin requests.
import morgan from 'morgan';     //---- Its help up to log the HTTP request.
import routes from './src/routes';
import { STATUS_CODE } from './src/constants';
import { sequelize } from './src/models';
import { logger } from './src/utils';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger';

const app = express();
const PORT = process.env.PORT;
// Security Middleware
app.use(helmet());
app.use(cors());
// Logging Middleware
app.use(morgan('dev'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', routes);
app.get('/health', (req: Request, res: Response) => {
  res.status(STATUS_CODE.OK).json({ status: 'ok', uptime: process.uptime() });
});

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(STATUS_CODE.NOT_FOUND).json({
    status: 'error',
    message: 'Route not found',
  });
});
// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    logger.info(`Database connected to ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    const server = app.listen(PORT, () => {
      logger.info(`Apple PassKey listening on port ${PORT}`);
    });
    const gracefulShutdown = async () => {
      await sequelize.close();
      server.close(() => {
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error: any) {
    logger.error(`Unable to connect to the database: ${error.message}`);
    process.exit(1);
  }
};

startServer();
