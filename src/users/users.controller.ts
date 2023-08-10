import { Controller, Get, Param, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../types/user.type';
import { Action } from '../types/action.type';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  public async getUserProfile(@Request() request: any): Promise<User> {
    const userEmail = request.user.email;
    return await this.usersService.findByEmail(userEmail);
  }

  @Get('/participation')
  public async getUserJoinedActions() {
    return null;
  }

  @Get('/creation/:userId')
  public async getUserCreatedActions(
    @Param('userId') userId: number,
  ): Promise<Action[]> {
    let actions: Action[];
    try {
      return await this.usersService.findUserCreatedActions(userId);
    } catch (error) {
      throw new Error('Cannot find user created actions >>> ' + error);
    }
    return actions;
  }
}
