import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { Action } from 'src/types/action.type';
import { CreateActionDto } from 'src/dto/createAction.dto';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionService: ActionsService) {}

  @Get()
  public async findAll(): Promise<Action[] | Error> {
    try {
      const actions = await this.actionService.getAllActions();
      return actions;
    } catch (error) {
      return new Error(error);
    }
  }

  @Post()
  public async CreateOne(
    @Body() body: CreateActionDto,
    @Req() request: Request,
  ): Promise<void | Error> {
    const organiserId = request;
    try {
      await this.actionService.createAction(body);
    } catch (error) {
      return new Error(error);
    }
  }
}
