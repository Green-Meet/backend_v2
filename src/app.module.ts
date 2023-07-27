import { Module } from '@nestjs/common';
import { ActionModule } from './actions/actions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ActionModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
