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
import { SystemDataSeeder } from './seed/seeders/system-data-seeder.service';
import { TestDataSeeder } from './seed/seeders/test-data-seeder.service';

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
    TestDataSeeder,
  ],
  controllers: [],
  providers: [
    ...coreServicesProviders,
    SystemDataSeeder,
    TestDataSeeder,
    JwtStrategy,
  ],
})
export class CoreModule {}
