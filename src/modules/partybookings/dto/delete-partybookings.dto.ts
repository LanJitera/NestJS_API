import { NumberField } from 'src/decorators/field.decorator';

export class DeletePartybookingParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class DeleteMessageResponse {}

export class DeletePartybookingResponseDTO {}
