import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto } from './dto/films.dto';
import { Film } from './films.model';
import { AppLogger } from '../core/services/logger.service';

@Injectable()
export class FilmsService implements OnModuleInit {
  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>, private appLogger: AppLogger
  ) { }

  onModuleInit() {
    console.log(`The module has been initialized.`);

  }

  async create(FilmDto: FilmDto): Promise<Film> {
    const newFilm = new this.filmModel(FilmDto);
    await newFilm.save();
    return newFilm.toObject({ versionKey: false });
  }

  async getFilms(): Promise<Film[]> {
    this.appLogger.log('getting films')
    return await this.filmModel.find();
  }

  async getFilmBySlug(filmSlug: string): Promise<Film> {
    return await this.filmModel.find({ slug: filmSlug });
  }

}
