import { SetMetadata } from '@nestjs/common';
import dotenv = require('dotenv');

export const jwtConstants = {
  SECRET: dotenv.config({
    path: './config/dev.env',
  }).parsed.SECRET,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
