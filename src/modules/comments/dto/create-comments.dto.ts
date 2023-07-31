import { Comment } from '@entities/comments';
import {
  NumberField,
  StringFieldOptional,
  NumberFieldOptional,
  ObjectField,
} from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from '@entities/parties';

export class CreateCommentRequest {
  @NumberField({ int: true })
  party_id: number;
  @NumberField({ int: true })
  user_id: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  comment?: string;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  id_cmtrep?: number;
}
export class CreateCommentRequestDTO {
  @ObjectField(CreateCommentRequest)
  comments: CreateCommentRequest;
}
export class PartyCreateCommentResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
  admin_id: number;
  describe: string;
  requiredage: number;
  img: string;
}
export class UserCreateCommentResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  isactive: boolean;
  username: string;
  password: string;
  dateofbirth: Date;
  email: string;
}
export class CreateCommentResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  party: PartyCreateCommentResponse;
  party_id: number;
  user: UserCreateCommentResponse;
  user_id: number;
  comment: string;
  id_cmtrep: number;
}
export class CreateErrorObjectResponse {}

export class CreateCommentResponseDTO {
  comment: CreateCommentResponse;
  error_object: Object;

  constructor(comment: Comment, error_object?: Object) {
    this.comment = {
      ...comment,
      id: comment?.id,
      created_at: comment?.created_at,
      updated_at: comment?.updated_at,
      party: {
        id: comment?.party?.id,
        created_at: comment?.party?.created_at,
        updated_at: comment?.party?.updated_at,
        nameparty: comment?.party?.nameparty,
        partystarttime: comment?.party?.partystarttime,
        partylocation: comment?.party?.partylocation,
        numberofpeople: comment?.party?.numberofpeople,
        isstatus: comment?.party?.isstatus,
        admin_id: comment?.party?.admin_id,
        describe: comment?.party?.describe,
        requiredage: comment?.party?.requiredage,
        img: comment?.party?.img,
      },
      party_id: comment?.party_id,
      user: {
        id: comment?.user?.id,
        created_at: comment?.user?.created_at,
        updated_at: comment?.user?.updated_at,
        isactive: comment?.user?.isactive,
        username: comment?.user?.username,
        password: comment?.user?.password,
        dateofbirth: comment?.user?.dateofbirth,
        email: comment?.user?.email,
      },
      user_id: comment?.user_id,
      comment: comment?.comment,
      id_cmtrep: comment?.id_cmtrep,
    };
    this.error_object = error_object;
  }
}
