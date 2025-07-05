import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { databaseConfig } from './modules/_core/config/database.config';
import { featureModules } from './modules/_core/config/feature-modules.config';
import { CoreModule } from './modules/_core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    CoreModule,
    ...featureModules,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
