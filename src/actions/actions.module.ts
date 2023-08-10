import { Module } from '@nestjs/common';
import { ActionsController } from 'src/actions/actions.controller';
import { ActionsService } from './actions.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  controllers: [ActionsController],
  providers: [ActionsService, UsersService],
})
export class ActionModule {}
