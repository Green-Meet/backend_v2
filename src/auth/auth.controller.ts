import {
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/login')
  public async signIn(
    @Body() body: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.signIn(body);
    response
      .cookie('jwt', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
        httpOnly: true,
        secure: false,
      })
      .status(200);
  }
}