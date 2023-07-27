import { Controller, Get } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { Action } from 'src/types/action.type';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionService: ActionsService) {}

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
