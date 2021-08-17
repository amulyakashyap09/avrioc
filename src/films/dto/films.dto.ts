import { IsString, IsNotEmpty, IsNumber, IsDate, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    ticketPrice: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    rating: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    country: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    genre: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    releaseDate: Date;
}