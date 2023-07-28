import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/types/user.type';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  public async getUserProfile(@Request() request: any): Promise<User> {
    const userEmail = request.user.email;
    return await this.usersService.findByEmail(userEmail);
  }
}
