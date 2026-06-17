import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  film: string;

  @Column()
  session: string;

  @Column('timestamptz')
  daytime: Date;

  @Column()
  row: number;

  @Column()
  seat: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.tickets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ name: 'orderId' })
  orderId: string;
}
