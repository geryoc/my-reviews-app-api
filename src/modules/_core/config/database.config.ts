import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entityList } from './entities.config';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: configService.get<string>('DB_TYPE') as
    | 'mysql'
    | 'postgres'
    | 'sqlite'
    | 'mariadb',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  migrationsRun: configService.get<boolean>('DB_MIGRATIONSRUN'),
  migrations: [__dirname + './../migrations/*{.ts,.js}'],
  entities: entityList,
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
});
