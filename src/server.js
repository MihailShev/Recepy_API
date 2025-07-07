import path from 'node:path';

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import router from '../src/routers/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export function setupServer() {
  const app = express();
  const PORT = getEnvVar('PORT');

  app.use('/thumb', express.static(path.resolve('src', 'uploads', 'photo')));

  app.use('/api-docs', swaggerDocs());

  app.use(express.json());

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(
    cors({
      origin: ['http://localhost:5173', 'https://tasteorama-recepy.vercel.app'],
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({ message: 'Server started!' });
  });

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    try {
      console.log(`Server is running on port ${PORT}`);
    } catch (err) {
      console.error(err);
    }
  });
}
