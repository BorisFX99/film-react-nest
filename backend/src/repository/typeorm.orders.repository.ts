import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Order } from '../order/entities/order.entity';
import { Ticket } from '../order/entities/ticket.entity';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { OrderTicketDto } from '../order/dto/order-ticket.dto';

@Injectable()
class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderTicketDto[]> {
    // 1. Создаём и сохраняем заказ
    const order = this.orderRepository.create({
      email: createOrderDto.email,
      phone: createOrderDto.phone,
    });
    const savedOrder = await this.orderRepository.save(order);

    // 2. Создаём билеты с привязкой к заказу
    const tickets = createOrderDto.tickets.map((ticket) =>
      this.ticketRepository.create({
        orderId: savedOrder.id,
        film: ticket.film,
        session: ticket.session,
        daytime: new Date(ticket.daytime),
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      }),
    );

    // 3. Сохраняем билеты
    const savedTickets = await this.ticketRepository.save(tickets);

    // 4. Преобразуем в DTO через plainToInstance
    return plainToInstance(OrderTicketDto, savedTickets, {
      excludeExtraneousValues: true,
    });
  }
}

export default OrdersRepository;
