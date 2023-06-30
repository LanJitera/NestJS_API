import { Party, IsstatusEnum as PartyIsstatusEnum } from 'entities/parties';
import { NumberFieldOptional } from 'src/decorators/field.decorator';
import { StatusEnum as PartybookingStatusEnum } from 'entities/partybookings';

export class TestPartyRequestDTO {
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
  @NumberFieldOptional({})
  useid?: number;
}
export class PartybookingTestPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  party_id: number;
  status: `${PartybookingStatusEnum}`;
}
export class TestPartyResponse {
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
  partybookings: PartybookingTestPartyResponse[];
}
export class TestMessageResponse {}

export class TestPartyResponseDTO {
  parties: TestPartyResponse[];
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
      admin_id: party?.admin_id,
      describe: party?.describe,
      requiredage: party?.requiredage,
      img: party?.img,
      partybookings: party?.partybookings?.map((partybooking) => ({
        ...partybooking,
        id: partybooking?.id,
        created_at: partybooking?.created_at,
        updated_at: partybooking?.updated_at,
        user_id: partybooking?.user_id,
        party_id: partybooking?.party_id,
        status: partybooking?.status,
      })),
    }));
    this.total_pages = total_pages;
    this.message = message;
    this.total_count = total_count;
  }
}
