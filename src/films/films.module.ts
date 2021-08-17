import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmSchema } from './films.model';
import { WinstonModule, } from 'nest-winston';
import { AppLogger } from '../core/services/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }]),
    WinstonModule
  ],
  controllers: [FilmsController],
  providers: [FilmsService, AppLogger],
})
export class FilmsModule { }
