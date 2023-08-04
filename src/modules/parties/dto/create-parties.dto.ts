import { Party, IsstatusEnum as PartyIsstatusEnum } from '@entities/parties';
import {
  StringField,
  DateField,
  NumberFieldOptional,
  EnumFieldOptional,
  NumberField,
  StringFieldOptional,
  ObjectField,
} from 'src/decorators/field.decorator';

export class CreatePartyRequest {
  @StringField({ maxLength: 255, minLength: 0 })
  nameparty: string;
  @DateField({})
  partystarttime: Date;
  @StringField({ maxLength: 255, minLength: 0 })
  partylocation: string;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  numberofpeople?: number;
  @EnumFieldOptional(() => PartyIsstatusEnum)
  isstatus?: PartyIsstatusEnum;
  @NumberField({ int: true })
  admin_id: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  describe?: string;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  requiredage?: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  img?: string;
}
export class CreatePartyRequestDTO {
  @ObjectField(CreatePartyRequest)
  parties: CreatePartyRequest;
}
export class PartybookingCreatePartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  party_id: number;
}
export class AdminCreatePartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
}
export class CommentCreatePartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  party_id: number;
}
export class CreatePartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
  partybookings: PartybookingCreatePartyResponse[];
  admin: AdminCreatePartyResponse;
  admin_id: number;
  describe: string;
  requiredage: number;
  img: string;
  comments: CommentCreatePartyResponse[];
}
export class CreateErrorObjectResponse {}

export class CreatePartyResponseDTO {
  party: CreatePartyResponse;
  error_object: Object;

  constructor(party: Party, error_object?: Object) {
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
      })),
    };
    this.error_object = error_object;
  }
}
