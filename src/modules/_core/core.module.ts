import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from './config/entities.config';
import {
  SystemDataSeeder,
  systemSeeders,
} from './seed/system/system-data-seeder.service';
import { DevDataSeeder, devSeeders } from './seed/dev/dev-data-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature(entityList)],
  exports: [TypeOrmModule, SystemDataSeeder, DevDataSeeder],
  controllers: [],
  providers: [...systemSeeders, ...devSeeders],
})
export class CoreModule {}
