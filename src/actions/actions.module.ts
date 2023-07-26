import { Module } from '@nestjs/common';
import { ActionController } from 'src/actions/actions.controller';
import { ActionService } from './actions.service';

@Module({
  imports: [],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
