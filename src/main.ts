/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');
const dotenv = require('dotenv');

async function bootstrap() {
  dotenv.config({
    path: './config/dev.env',
  });
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(8001);
}
bootstrap();
