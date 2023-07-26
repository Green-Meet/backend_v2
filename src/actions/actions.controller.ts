import { Controller, Get } from '@nestjs/common';
import { ActionService } from './actions.service';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const actions = await this.actionService.getAllAction();
      return actions;
    } catch (error) {
      return new Error(error);
    }
  }
}
