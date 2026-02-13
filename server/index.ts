import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './src/routes';
import { STATUS_CODE } from './src/constants/status_code';

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
  console.error(err.stack);
  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

const server = app.listen(PORT, () => {
  console.log(`Apple PassKey listening on port ${PORT}`);
});

const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
