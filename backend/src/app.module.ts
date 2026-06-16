import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { getStaticConfig } from './config/static.config';
import { Film } from './films/entities/film.entity';
import { Schedule } from './films/entities/schedule.entity';
import { Order } from './order/entities/order.entity';
import { Ticket } from './order/entities/ticket.entity';

@Module({
  imports: [
    // 1. Статика
    ServeStaticModule.forRootAsync({
      useFactory: getStaticConfig,
      inject: [ConfigService],
    }),

    // 2. Конфигурация
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    // 3. TypeORM вместо MongoDB
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'prac'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME', 'prac'),
        entities: [Film, Schedule, Order, Ticket],
        synchronize: false, // таблицы созданы вручную
        logging: true, // для отладки
      }),
      inject: [ConfigService],
    }),

    // 4. Модули приложения
    OrderModule,
    FilmsModule,
  ],
  controllers: [],
})
export class AppModule {}
