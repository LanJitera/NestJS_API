import {
  Controller,
  Query,
  Get as MethodGet,
  Param,
  Body,
  Post as MethodPost,
  Put as MethodPut,
  Delete as MethodDelete,
} from '@nestjs/common';
import { PartyService } from './parties.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterPartyResponseDTO,
  FilterPartyRequestDTO,
  FilterPartyRequest,
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
import { ApiNestedQuery } from 'decorators/api-nested-query.decorator';

@Controller()
@ApiTags('Party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @MethodGet('/api/parties')
  @ApiNestedQuery('parties', FilterPartyRequest)
  filter(@Query() queries: FilterPartyRequestDTO): Promise<FilterPartyResponseDTO> {
    return this.partyService.filter(queries);
  }

  @MethodGet('/api/parties/:id')
  show(
    @Param() params: ShowPartyParamsDTO,
    @Query() queries: ShowPartyRequestDTO,
  ): Promise<ShowPartyResponseDTO> {
    return this.partyService.show(params, queries);
  }

  @MethodPost('/api/parties')
  create(@Body() request: CreatePartyRequestDTO): Promise<CreatePartyResponseDTO> {
    return this.partyService.create(request);
  }

  @MethodPut('/api/parties/:id')
  update(
    @Param() params: UpdatePartyParamsDTO,
    @Body() request: UpdatePartyRequestDTO,
  ): Promise<UpdatePartyResponseDTO> {
    return this.partyService.update(params, request);
  }

  @MethodDelete('/api/parties/:id')
  delete(@Param() params: DeletePartyParamsDTO): Promise<DeletePartyResponseDTO> {
    return this.partyService.delete(params);
  }

  @MethodGet('/api/parties/BookingHistory')
  test(@Query() queries: TestPartyRequestDTO): Promise<TestPartyResponseDTO> {
    return this.partyService.test(queries);
  }
}
