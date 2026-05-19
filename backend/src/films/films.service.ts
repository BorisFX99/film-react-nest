import { Injectable, NotFoundException } from '@nestjs/common';
import FilmsRepository from '../repository/mongo.films.repository';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  // create(createFilmDto: CreateFilmDto) {
  //   return 'This action adds a new film';
  // }

  async findAll() {
    const films: Film[] = await this.filmsRepository.findAll();
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

  // findOne(id: number) {
  //   return `This action returns a #${id} film`;
  // }

  // update(id: number, updateFilmDto: UpdateFilmDto) {
  //   return `This action updates a #${id} film`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} film`;
  // }
}
