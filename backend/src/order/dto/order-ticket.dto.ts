import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsDateString,
  Min,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class OrderTicketDto {
  @Expose()
  @IsUUID('4')
  id: string;

  @Expose()
  @IsUUID('4')
  film: string;

  @Expose()
  @IsUUID('4')
  session: string;

  @Expose()
  @IsDateString()
  daytime: string;

  @Expose()
  @IsNumber()
  @Min(1)
  row: number;

  @Expose()
  @IsNumber()
  @Min(1)
  seat: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Expose()
  @IsOptional()
  @IsString()
  day?: string;

  @Expose()
  @IsOptional()
  @IsString()
  time?: string;
}
