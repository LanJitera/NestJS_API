import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterCommentResponseDTO,
  FilterCommentRequestDTO,
  ShowCommentResponseDTO,
  ShowCommentParamsDTO,
  CreateCommentResponseDTO,
  CreateCommentRequestDTO,
  UpdateCommentResponseDTO,
  UpdateCommentParamsDTO,
  UpdateCommentRequestDTO,
  DeleteCommentResponseDTO,
  DeleteCommentParamsDTO,
} from './dto';
import {
  QueryCondition,
  QueryOperators,
  QueryWhereType,
  QueryRelation,
  QueryPagination,
  QueryOrder,
  QueryOrderDir,
} from 'src/shared/base.repository';
import { Comment } from 'entities/comments';
import { CommentRepository } from './comments.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    readonly repository: CommentRepository,
  ) {}

  async filter(queries: FilterCommentRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'party_id',
        value: queries?.comments?.party_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'user_id',
        value: queries?.comments?.user_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'comment',
        value: queries?.comments?.comment,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'id_cmtrep',
        value: queries?.comments?.id_cmtrep,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'party', alias: 'parties' },
      { column: 'user', alias: 'users' },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [{ orderBy: 'comments.created_at', orderDir: QueryOrderDir.DESC }];

    const [comments, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterCommentResponseDTO(comments, totalCount, totalPages);
  }
  async show(params: ShowCommentParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'comments.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'party', alias: 'parties' },
      { column: 'user', alias: 'users' },
    ];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowCommentResponseDTO(show);
  }
  async create(request: CreateCommentRequestDTO) {
    const relations: QueryRelation[] = [
      { column: 'party', alias: 'parties' },
      { column: 'user', alias: 'users' },
    ];

    const data = {
      party_id: request?.comments?.party_id,
      user_id: request?.comments?.user_id,
      comment: request?.comments?.comment,
      id_cmtrep: request?.comments?.id_cmtrep,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreateCommentResponseDTO(create);
  }
  async update(params: UpdateCommentParamsDTO, request: UpdateCommentRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'comments.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'party', alias: 'parties' },
      { column: 'user', alias: 'users' },
    ];

    const data = {
      party_id: request?.comments?.party_id,
      user_id: request?.comments?.user_id,
      comment: request?.comments?.comment,
      id_cmtrep: request?.comments?.id_cmtrep,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdateCommentResponseDTO(update);
  }
  async delete(params: DeleteCommentParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'comments.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeleteCommentResponseDTO();
  }
}
