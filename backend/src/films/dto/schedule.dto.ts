import { IsString, IsNumber, IsArray } from 'class-validator';
import { Type, Expose, Transform } from 'class-transformer';

export class ScheduleDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  @IsString()
  daytime: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  hall: number;

  @Expose()
  @IsNumber()
  rows: number;

  @Expose()
  @IsNumber()
  seats: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @Expose()
  @IsArray()
  taken: string[];
}
