import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schemas/film.schema';
import { FilmsController } from './films.controller';
import FilmsRepository from '../repository/mongo.films.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsRepository],
})
export class FilmsModule {}
