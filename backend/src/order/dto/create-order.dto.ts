import {
  IsString,
  IsNumber,
  IsArray,
  Min,
  ArrayMinSize,
  IsEmail,
  IsUUID,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// валидация только данных билета
export class CreateOrderTicketDto {
  @IsUUID('4', { message: 'ID фильма должен соотвествовать формату UUID' })
  film: string;

  @IsUUID('4', { message: 'ID сессии должен соотвествовать формату UUID' })
  session: string;

  @IsDateString({}, { message: 'Время сессии должно быть в формате ISO 8601' })
  daytime: string;

  @IsNumber({}, { message: 'Ряд должен быть числом' })
  @Min(1, { message: 'Ряд не может быть меньше 1' })
  @Type(() => Number)
  row: number;

  @IsNumber({}, { message: 'Место должно быть числом' })
  @Min(1, { message: 'Место не может быть меньше 1' })
  @Type(() => Number)
  seat: number;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @Type(() => Number)
  price: number;

  // Добавить опциональные поля для совместимости c фронтом
  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsString()
  time?: string;
}

// полная структура билета
export class CreateOrderDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  email: string;

  @IsString({ message: 'Телефон должен быть передан в формате строки' })
  phone: string;

  @IsArray({ message: 'Билеты должны быть массивом' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderTicketDto)
  @ArrayMinSize(1, { message: 'Должен быть хотя бы один билет' })
  tickets: CreateOrderTicketDto[];
}
