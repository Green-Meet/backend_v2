import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/types/action.type';

@Injectable()
export class ActionsService {
  Postgres = new Pool();
  async getAllActions(): Promise<Action[]> {
    const actionsRows = await this.Postgres.query('SELECT * FROM actions');
    return actionsRows.rows as Action[];
  }
}
