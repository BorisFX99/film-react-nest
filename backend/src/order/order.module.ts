import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import OrdersRepository from '../repository/typeorm.orders.repository';
import { FilmsModule } from '../films/films.module';
import { Order } from './entities/order.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Ticket]), // регистрируем сущности
    FilmsModule, // для доступа к FilmsRepository
  ],
  controllers: [OrderController],
  providers: [OrderService, OrdersRepository],
})
export class OrderModule {}
