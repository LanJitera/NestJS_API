import { User } from 'entities/users';
import {
  BooleanFieldOptional,
  StringField,
  DateField,
  StringFieldOptional,
  ObjectField,
} from 'src/decorators/field.decorator';

export class CreateUserRequest {
  @BooleanFieldOptional({})
  isactive?: boolean;
  @StringField({ maxLength: 255, minLength: 0 })
  username: string;
  @DateField({})
  dateofbirth: Date;
  @StringField({ email: true, maxLength: 255, minLength: 0 })
  email: string;
  @StringFieldOptional({ maxLength: 65535, minLength: 0, password: true })
  password?: string;
}
export class CreateUserRequestDTO {
  @ObjectField(CreateUserRequest)
  users: CreateUserRequest;
}
export class PartybookingCreateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
export class CommentCreateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  party_id: number;
  user_id: number;
}
export class CreateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  partybookings: PartybookingCreateUserResponse[];
  isactive: boolean;
  username: string;
  password: string;
  dateofbirth: Date;
  email: string;
  comments: CommentCreateUserResponse[];
}
export class CreateErrorObjectResponse {}

export class CreateUserResponseDTO {
  user: CreateUserResponse;
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
      comments: user?.comments?.map((comment) => ({
        ...comment,
        id: comment?.id,
        created_at: comment?.created_at,
        updated_at: comment?.updated_at,
        party_id: comment?.party_id,
        user_id: comment?.user_id,
      })),
    };
    this.error_object = error_object;
  }
}
