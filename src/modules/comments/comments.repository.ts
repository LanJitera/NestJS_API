import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Comment } from 'entities/comments';

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {}
