import { Partybooking, StatusEnum as PartybookingStatusEnum } from 'entities/partybookings';
import { NumberField } from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from 'entities/parties';

export class ShowPartybookingParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UserShowPartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
}
export class PartyShowPartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
}
export class ShowPartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user: UserShowPartybookingResponse;
  user_id: number;
  party: PartyShowPartybookingResponse;
  party_id: number;
  status: `${PartybookingStatusEnum}`;
}
export class ShowMessageResponse {}

export class ShowPartybookingResponseDTO {
  partybooking: ShowPartybookingResponse;
  message: Object;

  constructor(partybooking: Partybooking, message?: Object) {
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
    this.message = message;
  }
}
