import { IsString, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ScheduleDto {
  @IsString()
  id: string;

  @IsString()
  daytime: string;

  @IsString()
  hall: string;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsArray()
  taken: string[];
}
