import { Injectable, NotFoundException } from '@nestjs/common';
import FilmsRepository from '../repository/mongo.films.repository';

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
    return {
      total: searchedFilm.schedule.length,
      items: searchedFilm.schedule,
    };
  }
}
