import { NumberField, StringField, ObjectField } from 'src/decorators/field.decorator';

export class DeleteAdminParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class DeleteAdminRequest {
  @StringField({})
  email: string;
  @StringField({})
  name: string;
}
export class DeleteAdminRequestDTO {
  @ObjectField(DeleteAdminRequest)
  admins: DeleteAdminRequest;
}
export class DeleteMessageResponse {}

export class DeleteAdminResponseDTO {}
