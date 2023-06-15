import { Admin } from 'entities/admins';
import { StringField, ObjectField } from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from 'entities/parties';

export class CreateAdminRequest {
  @StringField({ maxLength: 255, minLength: 0 })
  name: string;
  @StringField({ email: true, maxLength: 255, minLength: 0 })
  email: string;
}
export class CreateAdminRequestDTO {
  @ObjectField(CreateAdminRequest)
  admins: CreateAdminRequest;
}
export class PartyCreateAdminResponse {
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
export class CreateAdminResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties: PartyCreateAdminResponse[];
  name: string;
  email: string;
}
export class CreateErrorObjectResponse {}

export class CreateAdminResponseDTO {
  admin: CreateAdminResponse;
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
