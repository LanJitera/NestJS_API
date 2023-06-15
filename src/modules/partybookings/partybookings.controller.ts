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
import { PartybookingService } from './partybookings.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterPartybookingResponseDTO,
  FilterPartybookingRequestDTO,
  FilterPartybookingRequest,
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
import { ApiNestedQuery } from 'decorators/api-nested-query.decorator';

@Controller()
@ApiTags('Partybooking')
export class PartybookingController {
  constructor(private readonly partybookingService: PartybookingService) {}

  @MethodGet('/api/partybookings')
  @ApiNestedQuery('partybookings', FilterPartybookingRequest)
  filter(@Query() queries: FilterPartybookingRequestDTO): Promise<FilterPartybookingResponseDTO> {
    return this.partybookingService.filter(queries);
  }

  @MethodGet('/api/partybookings/:id')
  show(@Param() params: ShowPartybookingParamsDTO): Promise<ShowPartybookingResponseDTO> {
    return this.partybookingService.show(params);
  }

  @MethodPost('/api/partybookings')
  create(@Body() request: CreatePartybookingRequestDTO): Promise<CreatePartybookingResponseDTO> {
    return this.partybookingService.create(request);
  }

  @MethodPut('/api/partybookings/:id')
  update(
    @Param() params: UpdatePartybookingParamsDTO,
    @Body() request: UpdatePartybookingRequestDTO,
  ): Promise<UpdatePartybookingResponseDTO> {
    return this.partybookingService.update(params, request);
  }

  @MethodDelete('/api/partybookings/:id')
  delete(@Param() params: DeletePartybookingParamsDTO): Promise<DeletePartybookingResponseDTO> {
    return this.partybookingService.delete(params);
  }
}
