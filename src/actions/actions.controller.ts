import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { Action } from '../types/action.type';
import { CreateActionDto } from '../dto/createAction.dto';
import { Public } from '../auth/constants';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionService: ActionsService) {}

  @Public()
  @Get()
  public async findAll(): Promise<Action[] | Error> {
    try {
      const actions = await this.actionService.getAllActions();
      return actions;
    } catch (error) {
      return new Error(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createOne(@Body() body: CreateActionDto): Promise<void | Error> {
    try {
      await this.actionService.createAction(body);
    } catch (error) {
      return new Error(error);
    }
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  public async deleteOne(@Param('id') actionId: string): Promise<void | Error> {
    try {
      await this.actionService.deleteAction(actionId);
    } catch (error) {
      return new Error(error);
    }
  }
}
