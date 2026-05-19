import { Film } from '../entities/film.entity';
import { ScheduleEntity } from '../entities/schedule.entity';

export class FilmResponseDto extends Film {
  schedule: ScheduleEntity[];
}
