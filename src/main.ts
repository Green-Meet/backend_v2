/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');
const dotenv = require('dotenv');
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config({
    path: './config/dev.env',
  });
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8001);
}
bootstrap();
