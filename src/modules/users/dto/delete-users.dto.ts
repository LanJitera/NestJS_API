import { NumberField, StringField, DateField, ObjectField } from 'src/decorators/field.decorator';

export class DeleteUserParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class DeleteUserRequest {
  @StringField({})
  username: string;
  @StringField({})
  email: string;
  @StringField({})
  password: string;
  @DateField({})
  dateofbirth: Date;
}
export class DeleteUserRequestDTO {
  @ObjectField(DeleteUserRequest)
  users: DeleteUserRequest;
}
export class DeleteMessageResponse {}

export class DeleteUserResponseDTO {}
