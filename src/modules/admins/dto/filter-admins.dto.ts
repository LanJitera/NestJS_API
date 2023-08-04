import { Admin } from '@entities/admins';
import {
  StringFieldOptional,
  NumberFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from '@entities/parties';

export class FilterAdminRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  name?: string;
  @StringFieldOptional({ email: true, maxLength: 255, minLength: 0 })
  email?: string;
}
export class FilterAdminRequestDTO {
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
  @ObjectFieldOptional(FilterAdminRequest)
  admins?: FilterAdminRequest;
}
export class PartyFilterAdminResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
  admin_id: number;
}
export class FilterAdminResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties: PartyFilterAdminResponse[];
  name: string;
  email: string;
}
export class FilterMessageResponse {}

export class FilterAdminResponseDTO {
  admins: FilterAdminResponse[];
  total_pages?: number;
  message?: Object;
  total_count: number;

  constructor(admins: Admin[], total_count: number, total_pages?: number, message?: Object) {
    this.admins = admins.map((admin) => ({
      ...admin,
      id: admin?.id,
      created_at: admin?.created_at,
      updated_at: admin?.updated_at,
      parties: admin?.parties?.map((party) => ({
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
      })),
      name: admin?.name,
      email: admin?.email,
    }));
    this.total_pages = total_pages;
    this.message = message;
    this.total_count = total_count;
  }
}
