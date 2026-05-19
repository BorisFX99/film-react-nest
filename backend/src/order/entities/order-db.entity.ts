import { ObjectId } from 'mongodb';
import { OrderTicketEntity } from './order.entity';

// Тип заказа в базе данных хранится
export type OrderDb = {
  _id: ObjectId;
  email: string;
  phone: string;
  tickets: OrderTicketEntity[];
  createdAt: Date;
  updatedAt: Date;
};
