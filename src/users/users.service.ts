import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Injectable()
export class UsersService {
  Postgres = new Pool();

  public async createUser(user: CreateUserDto): Promise<void | Error> {
    const { firstName, lastName, email, city, password } = user;
    await this.Postgres.query(
      'INSERT INTO users(last_name, first_name, email, city, password) VALUES ($1, $2, $3, $4, $5)  RETURNING user_id, first_name, last_name',
      [firstName, lastName, email, city, password],
    );
  }
}
