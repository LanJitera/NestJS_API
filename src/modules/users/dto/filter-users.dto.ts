import { User } from 'entities/users';
import {
  BooleanFieldOptional,
  StringFieldOptional,
  DateFieldOptional,
  NumberFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class FilterUserRequest {
  @BooleanFieldOptional({})
  isactive?: boolean;
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  username?: string;
  @DateFieldOptional({})
  dateofbirth?: Date;
  @StringFieldOptional({ email: true, maxLength: 255, minLength: 0 })
  email?: string;
  @StringFieldOptional({ maxLength: 65535, minLength: 0, password: true })
  password?: string;
}
export class FilterUserRequestDTO {
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
  @ObjectFieldOptional(FilterUserRequest)
  users?: FilterUserRequest;
}
export class PartybookingFilterUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
export class CommentFilterUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  party_id: number;
  user_id: number;
}
export class FilterUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  partybookings: PartybookingFilterUserResponse[];
  isactive: boolean;
  username: string;
  password: string;
  dateofbirth: Date;
  email: string;
  comments: CommentFilterUserResponse[];
}
export class FilterMessageResponse {}

export class FilterUserResponseDTO {
  users: FilterUserResponse[];
  total_pages?: number;
  message?: Object;
  total_count: number;

  constructor(users: User[], total_count: number, total_pages?: number, message?: Object) {
    this.users = users.map((user) => ({
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
    }));
    this.total_pages = total_pages;
    this.message = message;
    this.total_count = total_count;
  }
}
