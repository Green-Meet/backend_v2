import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(body: UserLoginDto): Promise<string | Error> {
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
      const payload = { sub: user.userId, username: user.email };
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async signUp(body: CreateUserDto): Promise<string> {
    const user = await this.usersService.createUser(body);
    return this.getToken(user?.userId);
  }

  public getToken(userId: number) {
    const secret = process.env.SECRET;
    return jwt.sign({ id: userId }, secret);
  }
}
