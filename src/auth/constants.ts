import dotenv = require('dotenv');

export const jwtConstants = {
  SECRET: dotenv.config({
    path: './config/dev.env',
  }).parsed.SECRET,
};
