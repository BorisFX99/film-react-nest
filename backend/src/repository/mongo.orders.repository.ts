import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from '../order/schemas/order.schema';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { OrderTicketDto } from '../order/dto/order-ticket.dto';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderTicketDto[]> {
    const createdOrder = new this.orderModel(createOrderDto);
    const savedTickets = await createdOrder.save();
    return savedTickets.tickets;
  }
}
