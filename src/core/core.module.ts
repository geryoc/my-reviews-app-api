import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from './config/entities.config';

@Module({
  imports: [TypeOrmModule.forFeature(entityList)],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
