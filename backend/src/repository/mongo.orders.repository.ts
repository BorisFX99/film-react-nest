import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderTicketEntity } from '../order/entities/order.entity';
import { OrderDocument } from '../order/schemas/order.schema';
import { OrderDataToSave } from '../order/entities/OrderDataToSave';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: OrderDataToSave): Promise<OrderTicketEntity[]> {
    const createdOrder = new this.orderModel(createOrderDto);
    const savedTickets = await createdOrder.save();
    return savedTickets.tickets;
  }
}
