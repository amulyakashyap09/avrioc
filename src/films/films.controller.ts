import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto } from './dto/films.dto';
import { Film } from './films.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('films')
@ApiTags('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) { }

  @ApiOperation({ summary: 'create films' })
  @Post()
  async create(@Body() filmDto: FilmDto,): Promise<Film> {
    return await this.filmService.create(filmDto);
  }

  @ApiOperation({ summary: 'get films' })
  @Get()
  async getFilms(): Promise<Film[]> {
    return await this.filmService.getFilms();
  }

  @ApiOperation({ summary: 'get films by slug' })
  @Get(':slug')
  async getFilmBySlug(@Param('slug') slug: string) {
    const film = await this.filmService.getFilmBySlug(slug);
    return film[0];
  }
}
