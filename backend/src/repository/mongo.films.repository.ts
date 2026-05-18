import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mongoose';
import { Collection } from 'mongodb';
import { Film } from '../films/entities/film.entity';
import { FilmResponseDto } from '../films/dto/film-response.dto';

@Injectable()
  class FilmsRepository {
    private collection: Collection<FilmResponseDto>;

    constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {

    this.collection = this.connection.db.collection<FilmResponseDto>('films');
  }

  async findAll(): Promise<Film[]> {
    const films: Film[] = await this.collection
    .find({}, { projection: { schedule: 0 } })
    .toArray();
    return films;
  }

  async findFilmById(filmId:string): Promise<FilmResponseDto | null> {
    const film = await this.collection.findOne({ id: filmId });
    return film;
  }

}

export default FilmsRepository;