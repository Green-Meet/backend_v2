/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  private secret = process.env.SECRET;
  constructor(private readonly usersService: UsersService) {}

  public async signIn(body: UserLoginDto): Promise<void | Error> {
    const { email, password } = body;
    try {
      const user = await this.usersService.findOne(email);
      if (!user) {
        throw new Error('Email invalide');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Password invalide');
      }
      const token = jwt.sign({ id: user.userId }, this.secret);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
}
