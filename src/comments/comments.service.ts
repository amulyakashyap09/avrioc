import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comments.dto';
import { Comment } from './comments.model';
import { AppLogger } from '../core/services/logger.service';

@Injectable()
export class CommentsService implements OnModuleInit {
  constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>, private appLogger: AppLogger
  ) { }

  onModuleInit() {
    console.log(`The module has been initialized.`);

  }

  async create(CommentDto: CommentDto): Promise<Comment> {
    const newComment = new this.commentModel(CommentDto);
    await newComment.save();
    return newComment.toObject({ versionKey: false });
  }

  async getComments(filmId: string): Promise<Comment[]> {
    return await this.commentModel.find();
  }

}
