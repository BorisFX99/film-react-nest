import { OrderTicketEntity } from './order.entity';

export interface OrderDataToSave {
  email: string;
  phone: string;
  tickets: OrderTicketEntity[];
}
