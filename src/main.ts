import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors = require('cors');
import dotenv = require('dotenv');
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config({
    path: './config/dev.env',
  });
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8001);
}
bootstrap();
