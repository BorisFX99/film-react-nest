import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getStaticConfig } from './config/static.config';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      useFactory: getStaticConfig,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(
          'DATABASE_URL',
          'mongodb://localhost:27017/prac',
        ),
      }),
      inject: [ConfigService],
    }),
    OrderModule,
    FilmsModule,
  ],
  controllers: [],
})
export class AppModule {}
