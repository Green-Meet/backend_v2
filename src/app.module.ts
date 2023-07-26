import { Module } from '@nestjs/common';
import { ActionModule } from './actions/actions.module';

@Module({
  imports: [ActionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
