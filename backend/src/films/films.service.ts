import { Injectable, NotFoundException } from '@nestjs/common';
import FilmsRepository from '../repository/typeorm.films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async findScheduleByFilmId(id: string) {
    const searchedFilm = await this.filmsRepository.findFilmById(id);
    if (!searchedFilm)
      throw new NotFoundException(`Film with ID ${id} not found`);
    const schedule = searchedFilm.schedule || [];
    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
