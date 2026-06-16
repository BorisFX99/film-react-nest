import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { FilmResponseDto } from '../films/dto/film-response.dto';

@Injectable()
class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<FilmResponseDto[]> {
    const films = await this.filmRepository.find({
      relations: ['schedules'],
    });

    const dtos = plainToInstance(FilmResponseDto, films, {
      excludeExtraneousValues: true, // только поля с маркером @Expose()
    });

    // Гарантируем, что schedule всегда массив а то мало ли
    return dtos.map((dto) => ({
      ...dto,
      schedule: dto.schedule || [],
    }));
  }

  async findFilmById(filmId: string): Promise<FilmResponseDto | null> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedules'],
    });

    const dto = plainToInstance(FilmResponseDto, film, {
      excludeExtraneousValues: true,
    });

    // 1. Проверь, что film.schedules существует
    console.log('film.schedules:', film.schedules);

    // Гарантируем, что schedule всегда массив
    return {
      ...dto,
      schedule: dto.schedule || [],
    };
  }

  async addTakenSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<void> {
    await this.scheduleRepository
      .createQueryBuilder()
      .update(Schedule)
      .set({
        // условный if причем || это конкатенция добпавления как + в js
        taken: () => `CASE 
        WHEN taken IS NULL OR taken = '' THEN '${seatKey}'
        ELSE taken || ',${seatKey}'
      END`,
      })
      .where('id = :sessionId', { sessionId })
      .andWhere('"filmId" = :filmId', { filmId })
      .andWhere(`NOT (string_to_array(taken, ',') && ARRAY['${seatKey}'])`) // ← проверка, что места нет
      .execute();
  }
}

export default FilmsRepository;
