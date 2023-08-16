import { Partybooking, StatusEnum as PartybookingStatusEnum } from '@entities/partybookings';
import {
  NumberField,
  NumberFieldOptional,
  EnumFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from '@entities/parties';

export class UpdatePartybookingParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UpdatePartybookingRequest {
  @NumberFieldOptional({ int: true })
  user_id?: number;
  @NumberFieldOptional({ int: true })
  party_id?: number;
  @EnumFieldOptional(() => PartybookingStatusEnum)
  status?: PartybookingStatusEnum;
}
export class UpdatePartybookingRequestDTO {
  @ObjectFieldOptional(UpdatePartybookingRequest)
  partybookings?: UpdatePartybookingRequest;
}
export class UserUpdatePartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
}
export class PartyUpdatePartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
}
export class UpdatePartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user: UserUpdatePartybookingResponse;
  user_id: number;
  party: PartyUpdatePartybookingResponse;
  party_id: number;
  status: `${PartybookingStatusEnum}`;
}
export class UpdateErrorObjectResponse {}

export class UpdatePartybookingResponseDTO {
  partybooking: UpdatePartybookingResponse;
  error_object: Object;

  constructor(partybooking: Partybooking, error_object?: Object) {
    this.partybooking = {
      ...partybooking,
      id: partybooking?.id,
      created_at: partybooking?.created_at,
      updated_at: partybooking?.updated_at,
      user: {
        id: partybooking?.user?.id,
        created_at: partybooking?.user?.created_at,
        updated_at: partybooking?.user?.updated_at,
      },
      user_id: partybooking?.user_id,
      party: {
        id: partybooking?.party?.id,
        created_at: partybooking?.party?.created_at,
        updated_at: partybooking?.party?.updated_at,
        nameparty: partybooking?.party?.nameparty,
        partystarttime: partybooking?.party?.partystarttime,
        partylocation: partybooking?.party?.partylocation,
        numberofpeople: partybooking?.party?.numberofpeople,
        isstatus: partybooking?.party?.isstatus,
      },
      party_id: partybooking?.party_id,
      status: partybooking?.status,
    };
    this.error_object = error_object;
  }
}
