import { NumberField } from 'src/decorators/field.decorator';

export class DeleteCommentParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class DeleteMessageResponse {}

export class DeleteCommentResponseDTO {}
