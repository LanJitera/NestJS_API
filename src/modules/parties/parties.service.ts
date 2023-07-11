import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterPartyResponseDTO,
  FilterPartyRequestDTO,
  ShowPartyResponseDTO,
  ShowPartyParamsDTO,
  ShowPartyRequestDTO,
  CreatePartyResponseDTO,
  CreatePartyRequestDTO,
  UpdatePartyResponseDTO,
  UpdatePartyParamsDTO,
  UpdatePartyRequestDTO,
  DeletePartyResponseDTO,
  DeletePartyParamsDTO,
  TestPartyResponseDTO,
  TestPartyRequestDTO,
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
import { Party } from 'entities/parties';
import { PartyRepository } from './parties.repository';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    readonly repository: PartyRepository,
  ) {}

  async filter(queries: FilterPartyRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'nameparty',
        value: queries?.parties?.nameparty.toLowerCase(),
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE,
        isLowerCase: true
      },
      {
        column: 'partystarttime',
        value: queries?.parties?.partystarttime,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
        isDateTime: true,
      },
      {
        column: 'partylocation',
        value: queries?.parties?.partylocation.toLowerCase(),
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_AND,
        isLowerCase: true
      },
      {
        column: 'numberofpeople',
        value: queries?.parties?.numberofpeople,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
      {
        column: 'isstatus',
        value: queries?.parties?.isstatus,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
      {
        column: 'admin_id',
        value: queries?.parties?.admin_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
      {
        column: 'describe',
        value: queries?.parties?.describe,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_AND,
      },
      {
        column: 'requiredage',
        value: queries?.parties?.requiredage,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'partybookings', alias: 'partybookings' },
      { column: 'admin', alias: 'admins' },
      { column: 'comments', alias: 'comments' },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [{ orderBy: 'parties.created_at', orderDir: QueryOrderDir.DESC }];

    const [parties, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterPartyResponseDTO(parties, totalCount, totalPages);
  }
  async show(params: ShowPartyParamsDTO, queries: ShowPartyRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'partybookings', alias: 'partybookings' },
      { column: 'admin', alias: 'admins' },
      { column: 'comments', alias: 'comments' },
      { column: 'comments.user', alias: 'comments_users' },
    ];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowPartyResponseDTO(show);
  }
  async create(request: CreatePartyRequestDTO) {
    const relations: QueryRelation[] = [
      { column: 'partybookings', alias: 'partybookings' },
      { column: 'admin', alias: 'admins' },
      { column: 'comments', alias: 'comments' },
    ];

    const data = {
      nameparty: request?.parties?.nameparty,
      partystarttime: request?.parties?.partystarttime,
      partylocation: request?.parties?.partylocation,
      numberofpeople: request?.parties?.numberofpeople,
      isstatus: request?.parties?.isstatus,
      admin_id: request?.parties?.admin_id,
      describe: request?.parties?.describe,
      requiredage: request?.parties?.requiredage,
      img: request?.parties?.img,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreatePartyResponseDTO(create);
  }
  async update(params: UpdatePartyParamsDTO, request: UpdatePartyRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'partybookings', alias: 'partybookings' },
      { column: 'admin', alias: 'admins' },
      { column: 'comments', alias: 'comments' },
    ];

    const data = {
      nameparty: request?.parties?.nameparty,
      partystarttime: request?.parties?.partystarttime,
      partylocation: request?.parties?.partylocation,
      numberofpeople: request?.parties?.numberofpeople,
      isstatus: request?.parties?.isstatus,
      admin_id: request?.parties?.admin_id,
      describe: request?.parties?.describe,
      requiredage: request?.parties?.requiredage,
      img: request?.parties?.img,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdatePartyResponseDTO(update);
  }
  async delete(params: DeletePartyParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeletePartyResponseDTO();
  }
  async test(queries: TestPartyRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'partybookings.user_id',
        value: queries?.useid,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'parties.partybookings', alias: 'partybookings' },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [{ orderBy: 'parties.created_at', orderDir: QueryOrderDir.DESC }];

    const [parties, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new TestPartyResponseDTO(parties, totalCount, totalPages);
  }
}
