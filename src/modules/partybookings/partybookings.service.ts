import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterPartybookingResponseDTO,
  FilterPartybookingRequestDTO,
  ShowPartybookingResponseDTO,
  ShowPartybookingParamsDTO,
  CreatePartybookingResponseDTO,
  CreatePartybookingRequestDTO,
  UpdatePartybookingResponseDTO,
  UpdatePartybookingParamsDTO,
  UpdatePartybookingRequestDTO,
  DeletePartybookingResponseDTO,
  DeletePartybookingParamsDTO,
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
import { Partybooking } from 'entities/partybookings';
import { PartybookingRepository } from './partybookings.repository';

@Injectable()
export class PartybookingService {
  constructor(
    @InjectRepository(Partybooking)
    readonly repository: PartybookingRepository,
  ) {}

  async filter(queries: FilterPartybookingRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'user_id',
        value: queries?.partybookings?.user_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'party_id',
        value: queries?.partybookings?.party_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'status',
        value: queries?.partybookings?.status,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'username',
        value: queries?.username,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'user', alias: 'users' },
      { column: 'party', alias: 'parties' },
      { column: 'parties.img', alias: 'parties_img' },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [
      { orderBy: 'partybookings.created_at', orderDir: QueryOrderDir.DESC },
    ];

    const [partybookings, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterPartybookingResponseDTO(partybookings, totalCount, totalPages);
  }
  async show(params: ShowPartybookingParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'partybookings.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'user', alias: 'users' },
      { column: 'party', alias: 'parties' },
    ];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowPartybookingResponseDTO(show);
  }
  async create(request: CreatePartybookingRequestDTO) {
    const relations: QueryRelation[] = [
      { column: 'user', alias: 'users' },
      { column: 'party', alias: 'parties' },
    ];

    const data = {
      user_id: request?.partybookings?.user_id,
      party_id: request?.partybookings?.party_id,
      status: request?.partybookings?.status,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreatePartybookingResponseDTO(create);
  }
  async update(params: UpdatePartybookingParamsDTO, request: UpdatePartybookingRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'partybookings.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'user', alias: 'users' },
      { column: 'party', alias: 'parties' },
    ];

    const data = {
      user_id: request?.partybookings?.user_id,
      party_id: request?.partybookings?.party_id,
      status: request?.partybookings?.status,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdatePartybookingResponseDTO(update);
  }
  async delete(params: DeletePartybookingParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'partybookings.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeletePartybookingResponseDTO();
  }
}
