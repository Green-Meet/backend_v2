import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { Action } from '../types/action.type';
import { CreateActionDto } from '../dto/createAction.dto';
import { Public } from '../auth/constants';
import { Request } from 'express';

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
  public async createOne(
    @Body() body: CreateActionDto,
    @Req() request: Request,
  ): Promise<void | Error> {
    try {
      await this.actionService.createAction(body, request);
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

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/:id/join')
  public async joinOne(@Param('id') actionId: string, @Req() request: Request) {
    try {
      await this.actionService.joinAction(actionId, request);
    } catch (error) {
      throw new Error('Impossible de participer à une action >>> ' + error);
    }
  }
}
