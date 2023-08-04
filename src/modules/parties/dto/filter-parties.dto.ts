import { Party, IsstatusEnum as PartyIsstatusEnum } from '@entities/parties';
import {
  StringFieldOptional,
  DateFieldOptional,
  NumberFieldOptional,
  EnumFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class FilterPartyRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  nameparty?: string;
  @DateFieldOptional({})
  partystarttime?: Date;
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  partylocation?: string;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  numberofpeople?: number;
  @EnumFieldOptional(() => PartyIsstatusEnum)
  isstatus?: PartyIsstatusEnum;
  @NumberFieldOptional({ int: true })
  admin_id?: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  describe?: string;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  requiredage?: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  img?: string;
}
export class FilterPartyRequestDTO {
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
  @ObjectFieldOptional(FilterPartyRequest)
  parties?: FilterPartyRequest;
}
export class PartybookingFilterPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  party_id: number;
}
export class AdminFilterPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
}
export class CommentFilterPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  party_id: number;
}
export class FilterPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
  partybookings: PartybookingFilterPartyResponse[];
  admin: AdminFilterPartyResponse;
  admin_id: number;
  describe: string;
  requiredage: number;
  img: string;
  comments: CommentFilterPartyResponse[];
}
export class FilterMessageResponse {}

export class FilterPartyResponseDTO {
  parties: FilterPartyResponse[];
  total_pages?: number;
  message?: Object;
  total_count: number;

  constructor(parties: Party[], total_count: number, total_pages?: number, message?: Object) {
    this.parties = parties.map((party) => ({
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
    }));
    this.total_pages = total_pages;
    this.message = message;
    this.total_count = total_count;
  }
}
