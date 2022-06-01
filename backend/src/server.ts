import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { AppError } from './errors/AppError';
import { router } from './routes/routes';

import './database/connect';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  console.log(error)

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
})

app.listen('3333', () => console.log('server running at port 3333'));