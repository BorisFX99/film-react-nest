import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderTicket, OrderTicketSchema } from './order-ticket.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [OrderTicketSchema], required: true })
  tickets: OrderTicket[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
