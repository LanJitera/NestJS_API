import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { CommentRepository } from './comments.repository';
import { Comment } from '@entities/comments';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [provideCustomRepository(Comment, CommentRepository), CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
