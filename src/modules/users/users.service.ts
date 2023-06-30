import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterUserResponseDTO,
  FilterUserRequestDTO,
  ShowUserResponseDTO,
  ShowUserParamsDTO,
  ShowUserRequestDTO,
  CreateUserResponseDTO,
  CreateUserRequestDTO,
  UpdateUserResponseDTO,
  UpdateUserParamsDTO,
  UpdateUserRequestDTO,
  DeleteUserResponseDTO,
  DeleteUserParamsDTO,
  DeleteUserRequestDTO,
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
import { User } from 'entities/users';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly repository: UserRepository,
  ) {}

  async filter(queries: FilterUserRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'isactive',
        value: queries?.users?.isactive,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'username',
        value: queries?.users?.username,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_AND,
      },
      {
        column: 'dateofbirth',
        value: queries?.users?.dateofbirth,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
      {
        column: 'email',
        value: queries?.users?.email,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'partybookings', alias: 'partybookings' }];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [{ orderBy: 'users.created_at', orderDir: QueryOrderDir.DESC }];

    const [users, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterUserResponseDTO(users, totalCount, totalPages);
  }
  async show(params: ShowUserParamsDTO, queries: ShowUserRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'users.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'partybookings', alias: 'partybookings' }];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowUserResponseDTO(show);
  }
  async create(request: CreateUserRequestDTO) {
    const relations: QueryRelation[] = [{ column: 'partybookings', alias: 'partybookings' }];

    const data = {
      isactive: request?.users?.isactive,
      username: request?.users?.username,
      dateofbirth: request?.users?.dateofbirth,
      email: request?.users?.email,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreateUserResponseDTO(create);
  }
  async update(params: UpdateUserParamsDTO, request: UpdateUserRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'users.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'partybookings', alias: 'partybookings' }];

    const data = {
      isactive: request?.users?.isactive,
      username: request?.users?.username,
      dateofbirth: request?.users?.dateofbirth,
      email: request?.users?.email,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdateUserResponseDTO(update);
  }
  async delete(params: DeleteUserParamsDTO, request: DeleteUserRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'users.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeleteUserResponseDTO();
  }
}
