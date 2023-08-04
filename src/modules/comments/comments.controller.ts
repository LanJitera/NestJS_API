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
import { CommentService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterCommentResponseDTO,
  FilterCommentRequestDTO,
  FilterCommentRequest,
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
import { ApiNestedQuery } from '@decorators/api-nested-query.decorator';

@Controller()
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MethodGet('/api/comments')
  @ApiNestedQuery('comments', FilterCommentRequest)
  filter(@Query() queries: FilterCommentRequestDTO): Promise<FilterCommentResponseDTO> {
    return this.commentService.filter(queries);
  }

  @MethodGet('/api/comments/:id')
  show(@Param() params: ShowCommentParamsDTO): Promise<ShowCommentResponseDTO> {
    return this.commentService.show(params);
  }

  @MethodPost('/api/comments')
  create(@Body() request: CreateCommentRequestDTO): Promise<CreateCommentResponseDTO> {
    return this.commentService.create(request);
  }

  @MethodPut('/api/comments/:id')
  update(
    @Param() params: UpdateCommentParamsDTO,
    @Body() request: UpdateCommentRequestDTO,
  ): Promise<UpdateCommentResponseDTO> {
    return this.commentService.update(params, request);
  }

  @MethodDelete('/api/comments/:id')
  delete(@Param() params: DeleteCommentParamsDTO): Promise<DeleteCommentResponseDTO> {
    return this.commentService.delete(params);
  }
}
