import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmResponseDto } from '../films/dto/film-response.dto';
import { FilmDocument } from '../films/schemas/film.schema';

@Injectable()
class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<FilmResponseDto[]> {
    const films = await this.filmModel.find({}, { schedule: 0 }).lean();
    return films;
  }

  async findFilmById(filmId: string): Promise<FilmResponseDto | null> {
    const film = await this.filmModel.findOne({ id: filmId }).lean();
    return film;
  }

  async addTakenSeat(
    filmId: string,
    sessionId: string,
    daytime: string,
    seatKey: string,
  ): Promise<void> {
    await this.filmModel.updateOne(
      {
        id: filmId,
        'schedule.id': sessionId,
        'schedule.daytime': daytime,
      },
      {
        $addToSet: { 'schedule.$.taken': seatKey }, // добавляем место которое купили
      },
    );
  }
}

export default FilmsRepository;
