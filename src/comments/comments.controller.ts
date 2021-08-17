import { Controller, Post, Body, Get, UseGuards, Req, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comments.dto';
import { Comment } from './comments.model';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as mongoose from 'mongoose';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Auth header',
  // })
  @ApiOperation({ summary: 'add comments' })
  @Post()
  async create(@Req() request, @Body() commentDto: CommentDto): Promise<Comment> {
    const user = request.user;
    const userId = mongoose.Types.ObjectId(user.id);
    commentDto.filmId = mongoose.Types.ObjectId(commentDto.filmId);
    const dataToSave = Object.assign({}, { userId }, commentDto);
    return await this.commentService.create(dataToSave);
  }

  @ApiOperation({ summary: 'get comments' })
  @Get(':filmId')
  async getComments(@Param('filmId') filmId: string): Promise<Comment[]> {
    return await this.commentService.getComments(filmId);
  }
}
