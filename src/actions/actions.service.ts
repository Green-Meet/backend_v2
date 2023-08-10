import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import { Action } from '../types/action.type';
import { CreateActionDto } from '../dto/createAction.dto';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Injectable()
export class ActionsService {
  Postgres = new Pool();

  constructor(private readonly usersService: UsersService) {}

  async getAllActions(): Promise<Action[]> {
    const actionsRows = await this.Postgres.query('SELECT * FROM actions');
    return actionsRows.rows as Action[];
  }

  async createAction(body: CreateActionDto, request: Request): Promise<void> {
    const {
      title,
      type,
      description,
      address,
      beginDate,
      endDate,
      beginTime,
      endTime,
      city,
    } = body;
    const user = await this.usersService.findByEmail(request['user'].email);
    await this.Postgres.query(
      'INSERT INTO actions(title, type, description, address, begin_date, end_date, begin_time, end_time, organiser_id, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        title,
        type,
        description,
        address,
        beginDate,
        endDate,
        beginTime,
        endTime,
        user.userId,
        city.toLowerCase(),
      ],
    );
  }

  async deleteAction(actionId: string): Promise<void> {
    await this.Postgres.query('DELETE FROM actions WHERE action_id=$1', [
      actionId,
    ]);
  }
}
