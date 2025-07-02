import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  coreServicesExports,
  coreServicesProviders,
} from './config/core-services.config';
import { entityList } from './config/entities.config';
import { DevDataSeeder, devSeeders } from './seed/dev/dev-data-seeder.service';
import {
  SystemDataSeeder,
  systemSeeders,
} from './seed/system/system-data-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature(entityList)],
  exports: [
    TypeOrmModule,
    SystemDataSeeder,
    DevDataSeeder,
    ...coreServicesExports,
  ],
  controllers: [],
  providers: [...systemSeeders, ...devSeeders, ...coreServicesProviders],
})
export class CoreModule {}
