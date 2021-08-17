import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentSchema } from './comments.model';
import { WinstonModule, } from 'nest-winston';
import { AppLogger } from '../core/services/logger.service';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    WinstonModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, AppLogger],
})
export class CommentsModule { }
