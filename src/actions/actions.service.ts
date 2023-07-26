import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionService {
  Postgres = new Pool();
  async getAllAction(): Promise<any> {
    const actionsRows = await this.Postgres.query('SELECT * FROM actions');
    return actionsRows.rows;
  }
}
