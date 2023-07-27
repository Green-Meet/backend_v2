import { Module } from '@nestjs/common';
import { ActionModule } from './actions/actions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ActionModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
