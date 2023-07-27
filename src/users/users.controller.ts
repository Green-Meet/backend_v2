import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  public async signUp(@Body() body: CreateUserDto): Promise<void | Error> {
    try {
      await this.usersService.createUser(body);
    } catch (error) {
      return new Error(error);
    }
  }
}
