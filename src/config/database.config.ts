import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs(
  'database',
  (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],

    migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],

    synchronize: false,

    logging: process.env.NODE_ENV === 'development',

    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,

    extra: {
      max: parseInt(process.env.DB_POOL_SIZE ?? '10', 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
    },
  }),
);
