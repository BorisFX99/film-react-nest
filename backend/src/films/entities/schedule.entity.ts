import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  taken: string[];

  @Column('timestamptz')
  daytime: Date;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @ManyToOne(() => Film, (film) => film.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @Column({ name: 'filmId' })
  filmId: string;
}
