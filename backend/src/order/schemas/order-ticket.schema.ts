import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';

export type OrderTicketDocument = HydratedDocument<OrderTicket>;

@Schema({ _id: false }) // Это вложенный документ, без отдельного _id
export class OrderTicket {
  @Prop({
    required: true,
    unique: true,
    default: () => randomUUID(), // Генерируем UUID при создании (убрал эту логику из сервиса)
  })
  id: string;

  @Prop({ required: true, type: String })
  film: string;

  @Prop({ required: true, type: String })
  session: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true, min: 1, max: 100 })
  row: number;

  @Prop({ required: true, min: 1, max: 100 })
  seat: number;

  @Prop({ required: true, min: 1 })
  price: number;
}

export const OrderTicketSchema = SchemaFactory.createForClass(OrderTicket);
