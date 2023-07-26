import { Controller, Get } from '@nestjs/common';
import { ActionService } from './actions.service';
import { Action } from 'src/types/action.type';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get()
  async findAll(): Promise<Action[] | Error> {
    try {
      const actions = await this.actionService.getAllActions();
      return actions;
    } catch (error) {
      return new Error(error);
    }
  }
}
