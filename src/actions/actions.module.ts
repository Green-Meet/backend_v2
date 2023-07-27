import { Module } from '@nestjs/common';
import { ActionsController } from 'src/actions/actions.controller';
import { ActionsService } from './actions.service';

@Module({
  imports: [],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionModule {}
