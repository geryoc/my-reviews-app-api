import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './auth/jwt.strategy';
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
  imports: [
    TypeOrmModule.forFeature(entityList),
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [
    ...coreServicesExports,
    PassportModule,
    TypeOrmModule,
    SystemDataSeeder,
    DevDataSeeder,
  ],
  controllers: [],
  providers: [
    ...systemSeeders,
    ...devSeeders,
    ...coreServicesProviders,
    JwtStrategy,
  ],
})
export class CoreModule {}
