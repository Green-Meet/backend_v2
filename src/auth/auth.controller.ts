import {
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../dto/userLogin.dto';
import { Response } from 'express';
import { CreateUserDto } from '../dto/createUser.dto';
import { Public } from './constants';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/login')
  public async signIn(
    @Body() body: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.signIn(body);
    const user = await this.usersService.findByEmail(body.email);
    response
      .cookie('jwt', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
        secure: false,
      })
      .send(user);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  public async signUp(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const token = await this.authService.signIn(body);
      response
        .cookie('jwt', token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          secure: false,
        })
        .status(200);
    } catch (error) {
      throw new Error(error);
    }
  }
}
