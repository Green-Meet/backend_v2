import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../types/user.type';
import { Action } from '../types/action.type';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId/profile')
  public async getUserProfile(@Param('userId') userId: number): Promise<User> {
    try {
      return await this.usersService.findById(userId);
    } catch (error) {
      throw new Error('Cannot find user >>> ' + error);
    }
  }

  @Get('/:userId/participation')
  public async getUserJoinedActions(
    @Param('userId') userId: number,
  ): Promise<Action[]> {
    try {
      return await this.usersService.findUserJoinedActions(userId);
    } catch (error) {
      throw new Error('Cannot find user joined actions >>> ' + error);
    }
  }

  @Get('/:userId/creation')
  public async getUserCreatedActions(
    @Param('userId') userId: number,
  ): Promise<Action[]> {
    try {
      return await this.usersService.findUserCreatedActions(userId);
    } catch (error) {
      throw new Error('Cannot find user created actions >>> ' + error);
    }
  }
}
