import { Module } from '@nestjs/common';
import { CoreModule } from '../_core/core.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CoreModule],
  exports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
