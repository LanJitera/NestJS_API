import { User } from 'entities/users';
import {
  NumberField,
  BooleanFieldOptional,
  StringFieldOptional,
  DateFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class UpdateUserParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UpdateUserRequest {
  @BooleanFieldOptional({})
  isactive?: boolean;
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  username?: string;
  @DateFieldOptional({})
  dateofbirth?: Date;
  @StringFieldOptional({ email: true, maxLength: 255, minLength: 0 })
  email?: string;
  @StringFieldOptional({})
  password?: string;
}
export class UpdateUserRequestDTO {
  @ObjectFieldOptional(UpdateUserRequest)
  users?: UpdateUserRequest;
}
export class PartybookingUpdateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
export class UpdateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  partybookings: PartybookingUpdateUserResponse[];
  isactive: boolean;
  username: string;
  password: string;
  dateofbirth: Date;
  email: string;
}
export class UpdateErrorObjectResponse {}

export class UpdateUserResponseDTO {
  user: UpdateUserResponse;
  error_object: Object;

  constructor(user: User, error_object?: Object) {
    this.user = {
      ...user,
      id: user?.id,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
      partybookings: user?.partybookings?.map((partybooking) => ({
        ...partybooking,
        id: partybooking?.id,
        created_at: partybooking?.created_at,
        updated_at: partybooking?.updated_at,
        user_id: partybooking?.user_id,
      })),
      isactive: user?.isactive,
      username: user?.username,
      password: user?.password,
      dateofbirth: user?.dateofbirth,
      email: user?.email,
    };
    this.error_object = error_object;
  }
}
