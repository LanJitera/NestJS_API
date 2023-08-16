import { Party, IsstatusEnum as PartyIsstatusEnum } from '@entities/parties';
import {
  NumberField,
  StringFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class ShowPartyParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class ShowPartyRequest {
  @StringFieldOptional({})
  partylocation?: string;
  @StringFieldOptional({})
  nameparty?: string;
  @StringFieldOptional({})
  img?: string;
}
export class ShowPartyRequestDTO {
  @ObjectFieldOptional(ShowPartyRequest)
  parties?: ShowPartyRequest;
}
export class PartybookingShowPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  party_id: number;
}
export class AdminShowPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
}
export class UserCommentShowPartyResponse {
  user_id: number;
  user_created_at: Date;
  user_updated_at: Date;
  user_isactive: boolean;
  username: string;
  dateofbirth: Date;
  email: string;
}
export class CommentShowPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  party_id: number;
  user: UserCommentShowPartyResponse;
}
export class ShowPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
  partybookings: PartybookingShowPartyResponse[];
  admin: AdminShowPartyResponse;
  admin_id: number;
  describe: string;
  requiredage: number;
  img: string;
  comments: CommentShowPartyResponse[];
}
export class ShowMessageResponse {}

export class ShowPartyResponseDTO {
  party: ShowPartyResponse;
  message: Object;

  constructor(party: Party, message?: Object) {
    this.party = {
      ...party,
      id: party?.id,
      created_at: party?.created_at,
      updated_at: party?.updated_at,
      nameparty: party?.nameparty,
      partystarttime: party?.partystarttime,
      partylocation: party?.partylocation,
      numberofpeople: party?.numberofpeople,
      isstatus: party?.isstatus,
      partybookings: party?.partybookings?.map((partybooking) => ({
        ...partybooking,
        id: partybooking?.id,
        created_at: partybooking?.created_at,
        updated_at: partybooking?.updated_at,
        user_id: partybooking?.user_id,
        party_id: partybooking?.party_id,
      })),
      admin: {
        id: party?.admin?.id,
        created_at: party?.admin?.created_at,
        updated_at: party?.admin?.updated_at,
      },
      admin_id: party?.admin_id,
      describe: party?.describe,
      requiredage: party?.requiredage,
      img: party?.img,
      comments: party?.comments?.map((comment) => ({
        ...comment,
        id: comment?.id,
        created_at: comment?.created_at,
        updated_at: comment?.updated_at,
        party_id: comment?.party_id,
        user: {
          user_id: comment?.user?.id,
          user_created_at: comment?.user?.created_at,
          user_updated_at: comment?.user?.updated_at,
          user_isactive: comment?.user?.isactive,
          username: comment?.user?.username,
          dateofbirth: comment?.user?.dateofbirth,
          email: comment?.user?.email,
        },
      })),
    };
    this.message = message;
  }
}
