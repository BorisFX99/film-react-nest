import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { ScheduleDto } from './schedule.dto';

export class FilmResponseDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @Expose()
  @IsString()
  director: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  about: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  image: string;

  @Expose()
  @IsString()
  cover: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  @IsOptional()
  schedules?: ScheduleDto[];
}
