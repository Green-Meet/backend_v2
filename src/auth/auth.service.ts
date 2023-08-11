import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { UserLoginDto } from '../dto/userLogin.dto';
import { UsersService } from '../users/users.service';
import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(body: UserLoginDto): Promise<string | Error> {
    const { email, password } = body;
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new Error('Email invalide');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Password invalide');
      }
      const payload = { sub: user.user_id, email: user.email };
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async signUp(body: CreateUserDto): Promise<string> {
    const user = await this.usersService.createUser(body);
    const payload = { sub: user.user_id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
