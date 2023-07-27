import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/types/action.type';
import { CreateActionDto } from 'src/dto/createAction.dto';

@Injectable()
export class ActionsService {
  Postgres = new Pool();

  async getAllActions(): Promise<Action[]> {
    const actionsRows = await this.Postgres.query('SELECT * FROM actions');
    return actionsRows.rows as Action[];
  }

  async createAction(body: CreateActionDto): Promise<void> {
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
        666,
        city.toLowerCase(),
      ],
    );
  }
}
