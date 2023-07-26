import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const path = require('path');
const cors = require('cors');

async function bootstrap() {
  require('dotenv').config({
    path: './config/dev.env',
  });
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(8001);
}
bootstrap();
