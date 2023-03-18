import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg-protocol';

export const isQueryFailedError = (
  err: unknown,
): err is QueryFailedError & DatabaseError => err instanceof QueryFailedError;

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor() {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      schema: process.env.TYPEORM_SCHEMA,

      entities: ['.scr/modules/**/*.entity{.ts,.js}'],

      logger: 'advanced-console',
      logging: 'all',

      migrations: [process.env.TYPEORM_MIGRATIONS],
      migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
      migrationsRun:
        process.env.TYPEORM_MIGRATIONS_RUN === 'true' ? true : false,

      maxQueryExecutionTime: Number(
        process.env.TYPEORM_MAX_QUERY_EXECUTION_TIME,
      ),
      synchronize: false,
      autoLoadEntities: true,
    };
  }
}
