import { User } from 'entities/users';
import {
  NumberField,
  StringFieldOptional,
  DateFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class ShowUserParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class ShowUserRequest {
  @StringFieldOptional({})
  username?: string;
  @StringFieldOptional({})
  password?: string;
  @StringFieldOptional({})
  email?: string;
  @DateFieldOptional({})
  dateofbirth?: Date;
}
export class ShowUserRequestDTO {
  @ObjectFieldOptional(ShowUserRequest)
  users?: ShowUserRequest;
}
export class PartybookingShowUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
export class CommentShowUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  party_id: number;
  user_id: number;
}
export class ShowUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  partybookings: PartybookingShowUserResponse[];
  isactive: boolean;
  username: string;
  password: string;
  dateofbirth: Date;
  email: string;
  comments: CommentShowUserResponse[];
}
export class ShowMessageResponse {}

export class ShowUserResponseDTO {
  user: ShowUserResponse;
  message: Object;

  constructor(user: User, message?: Object) {
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
    this.message = message;
  }
}
