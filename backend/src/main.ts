import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { NormalizePathInterceptor } from './interceptors/normalize-path.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Условное подключение интерсептора так как тесты добавили слешы к пути статике
  if (process.env.STATIC_MODE === 'test') {
    app.useGlobalInterceptors(new NormalizePathInterceptor());
  }

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
