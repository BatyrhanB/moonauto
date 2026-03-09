import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe — глобально валидирует все входящие DTO.
  // whitelist: true — удаляет поля, которых нет в DTO (защита от лишних данных).
  // forbidNonWhitelisted: true — если передали лишнее поле — кидает 400 ошибку.
  // transform: true — автоматически преобразует типы (строка "123" → число 123).
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('app.port');
  await app.listen(port);
}
bootstrap();
