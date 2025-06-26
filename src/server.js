import path from 'node:path';
import * as fs from 'node:fs';

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import router from '../src/routers/index.js';

export function setupServer() {
  const app = express();
  const PORT = getEnvVar('PORT');

  const SWAGGER_DOCS = JSON.parse(
    fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
  );

  app.use('/photo', express.static(path.resolve('src', 'uploads', 'photo')));

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCS));

  app.use(express.json());

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(cors());

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
