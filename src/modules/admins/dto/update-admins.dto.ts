import { Admin } from 'entities/admins';
import {
  NumberField,
  StringFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from 'entities/parties';

export class UpdateAdminParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UpdateAdminRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  name?: string;
  @StringFieldOptional({ email: true, maxLength: 255, minLength: 0 })
  email?: string;
}
export class UpdateAdminRequestDTO {
  @ObjectFieldOptional(UpdateAdminRequest)
  admins?: UpdateAdminRequest;
}
export class PartyUpdateAdminResponse {
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
export class UpdateAdminResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties: PartyUpdateAdminResponse[];
  name: string;
  email: string;
}
export class UpdateErrorObjectResponse {}

export class UpdateAdminResponseDTO {
  admin: UpdateAdminResponse;
  error_object: Object;

  constructor(admin: Admin, error_object?: Object) {
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
    this.error_object = error_object;
  }
}
