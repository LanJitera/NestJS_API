import { Partybooking, StatusEnum as PartybookingStatusEnum } from 'entities/partybookings';
import {
  NumberFieldOptional,
  EnumFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { IsstatusEnum as PartyIsstatusEnum } from 'entities/parties';
import { StorageFile } from 'entities/storage_files';

export class FilterPartybookingRequest {
  @NumberFieldOptional({ int: true })
  user_id?: number;
  @NumberFieldOptional({ int: true })
  party_id?: number;
  @EnumFieldOptional(() => PartybookingStatusEnum)
  status?: PartybookingStatusEnum;
}
export class FilterPartybookingRequestDTO {
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
  @ObjectFieldOptional(FilterPartybookingRequest)
  partybookings?: FilterPartybookingRequest;
}
export class UserFilterPartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  dateofbirth: Date;
}
export class PartyFilterPartybookingResponse {
  id: number;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: `${PartyIsstatusEnum}`;
  img: StorageFile;
  describe: string;
  requiredage: number;
  admin_id: number;
}
export class FilterPartybookingResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  user: UserFilterPartybookingResponse;
  user_id: number;
  party: PartyFilterPartybookingResponse;
  party_id: number;
  status: `${PartybookingStatusEnum}`;
}
export class FilterMessageResponse {}

export class FilterPartybookingResponseDTO {
  partybookings: FilterPartybookingResponse[];
  total_pages?: number;
  message?: Object;
  total_count: number;

  constructor(
    partybookings: Partybooking[],
    total_count: number,
    total_pages?: number,
    message?: Object,
  ) {
    this.partybookings = partybookings.map((partybooking) => ({
      ...partybooking,
      id: partybooking?.id,
      created_at: partybooking?.created_at,
      updated_at: partybooking?.updated_at,
      user: {
        id: partybooking?.user?.id,
        created_at: partybooking?.user?.created_at,
        updated_at: partybooking?.user?.updated_at,
        name: partybooking?.user?.username,
        email: partybooking?.user?.email,
        dateofbirth: partybooking?.user?.dateofbirth,
      },
      user_id: partybooking?.user_id,
      party: {
        id: partybooking?.party?.id,
        nameparty: partybooking?.party?.nameparty,
        partystarttime: partybooking?.party?.partystarttime,
        partylocation: partybooking?.party?.partylocation,
        numberofpeople: partybooking?.party?.numberofpeople,
        isstatus: partybooking?.party?.isstatus,
        img: partybooking?.party?.img,
        describe: partybooking?.party?.describe,
        requiredage: partybooking?.party?.requiredage,
        admin_id: partybooking?.party?.admin_id,
      },
      party_id: partybooking?.party_id,
      status: partybooking?.status,
    }));
    this.total_pages = total_pages;
    this.message = message;
    this.total_count = total_count;
  }
}
