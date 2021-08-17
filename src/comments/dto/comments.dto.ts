import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    filmId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    comment: string;
}