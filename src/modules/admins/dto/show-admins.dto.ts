import { Admin } from 'entities/admins';
import {
  NumberField,
  StringFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from 'entities/parties';

export class ShowAdminParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class ShowAdminRequest {
  @StringFieldOptional({})
  email?: string;
  @StringFieldOptional({})
  name?: string;
}
export class ShowAdminRequestDTO {
  @ObjectFieldOptional(ShowAdminRequest)
  admins?: ShowAdminRequest;
}
export class PartyShowAdminResponse {
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
export class ShowAdminResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties: PartyShowAdminResponse[];
  name: string;
  email: string;
}
export class ShowMessageResponse {}

export class ShowAdminResponseDTO {
  admin: ShowAdminResponse;
  message: Object;

  constructor(admin: Admin, message?: Object) {
    this.admin = {
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
    };
    this.message = message;
  }
}
