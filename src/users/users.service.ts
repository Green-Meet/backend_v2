import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/types/user.type';
import bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  Postgres = new Pool();

  public async createUser(user: CreateUserDto): Promise<User | undefined> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const { firstName, lastName, email, city } = user;
    try {
      const rowsResponse = await this.Postgres.query(
        'INSERT INTO users(last_name, first_name, email, city, password) VALUES ($1, $2, $3, $4, $5)  RETURNING user_id, first_name, last_name',
        [firstName, lastName, email, city, hashedPassword],
      );
      return rowsResponse.rows[0] as User;
    } catch (error) {
      throw new Error('Error inserting new user');
    }
  }

  public async findOne(userEmail: string): Promise<User | undefined> {
    const rowsResponse = await this.Postgres.query(
      'SELECT * FROM users WHERE email=$1',
      [userEmail],
    );
    return rowsResponse.rows[0] as User;
  }
}
