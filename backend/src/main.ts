import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { normalizePathMiddleware } from './middlewares/normalize-path.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware для нормализации путей (работает до статики от двойных слешей тестов)
  app.use(normalizePathMiddleware);
  console.log('Path normalization middleware enabled (test mode)');


  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляем поля, которых нет в DTO
      forbidNonWhitelisted: true, // выбрасываем ошибку при лишних полях
      transform: true, // преобразует в экземпляр DTO (доступны методы в классе DTO)
    }),
  );
  await app.listen(3000);
}
bootstrap();
