import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ScheduleItem, ScheduleItemSchema } from './schedule-item.schema';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true, min: 0, max: 10 })
  rating: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({ type: [ScheduleItemSchema], default: [] })
  schedule: ScheduleItem[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
