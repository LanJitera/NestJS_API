import { NumberField, StringField, FileField, ObjectField } from 'src/decorators/field.decorator';
import { FileSystemStoredFile } from 'nestjs-form-data';

export class DeletePartyParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class DeletePartyRequest {
  @StringField({})
  partylocation: string;
  @StringField({})
  nameparty: string;
  @FileField({})
  img: FileSystemStoredFile;
}
export class DeletePartyRequestDTO {
  @ObjectField(DeletePartyRequest)
  parties: DeletePartyRequest;
}
export class DeleteMessageResponse {}

export class DeletePartyResponseDTO {}
