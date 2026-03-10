import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import * as Joi from 'joi';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(8888),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_POOL_SIZE: Joi.number().default(10),

        JWT_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_PASSWORD: Joi.string().optional().allow(''),
        REDIS_DB: Joi.number().default(0),

        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_FROM_NUMBER: Joi.string().required(),

        OTP_TTL_SECONDS: Joi.number().default(300),
        OTP_MAX_ATTEMPTS: Joi.number().default(3),
        OTP_RATE_LIMIT_SECONDS: Joi.number().default(60),
        OTP_CODE_LENGTH: Joi.number().default(6),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<DataSourceOptions>('database'),
    }),

    RedisModule,
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
