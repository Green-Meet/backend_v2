import { Pool } from 'pg';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Action } from '../types/action.type';
import { CreateActionDto } from '../dto/createAction.dto';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { User } from '../types/user.type';

@Injectable()
export class ActionsService {
  Postgres = new Pool();

  constructor(private readonly usersService: UsersService) {}

  async getAllActions(): Promise<Action[]> {
    const actionsRows = await this.Postgres.query('SELECT * FROM actions');
    return actionsRows.rows as Action[];
  }

  async getActionById(actionId: string): Promise<Action> {
    const actionRow = await this.Postgres.query(
      'SELECT status FROM actions WHERE action_id = $1',
      [actionId],
    );
    return actionRow.rows[0] as Action;
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
        user.user_id,
        city.toLowerCase(),
      ],
    );
  }

  async joinAction(
    actionId: string,
    request: Request,
  ): Promise<void | Response | Error> {
    try {
      await this.getActionById(actionId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Aucune action correspondante',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    let user: User;
    try {
      user = await this.usersService.findByEmail(request['user'].email);
      const actions = await this.usersService.findUserJoinedActions(
        user.user_id,
      );
      if (actions.length !== 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'Vous avez déjà rejoint une action',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } catch (error) {
      throw new Error('Impossible de récupérer les participants >>> ' + error);
    }
    try {
      await this.insertParticipant(user.user_id, actionId);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Impossible de participer à une action',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteAction(actionId: string): Promise<void> {
    await this.Postgres.query('DELETE FROM actions WHERE action_id=$1', [
      actionId,
    ]);
  }

  private async insertParticipant(userId: number, actionId: string) {
    return this.Postgres.query(
      'INSERT INTO participants (user_id, action_id) VALUES ($1, $2)',
      [userId, actionId],
    );
  }
}
