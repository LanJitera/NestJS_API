import { ObjectField, StringField, DateField } from '@decorators/field.decorator';

export class AuthRegistrationUserRequest {
  @StringField({ maxLength: 65535, minLength: 0, password: true })
  password: string;

  @StringField({ maxLength: 255, minLength: 0, equalTo: 'password' })
  password_confirmation: string;

  @StringField({ maxLength: 255, minLength: 0 })
  username: string;

  @StringField({ email: true, maxLength: 255, minLength: 0 })
  email: string;

  @DateField({})
  dateofbirth: Date;
}

export class AuthRegistrationUserRequestDto {
  @ObjectField(AuthRegistrationUserRequest)
  user: AuthRegistrationUserRequest;
}

export class AuthRegistrationAdminRequest {
  @StringField({ maxLength: 65535, minLength: 0, password: true })
  password: string;

  @StringField({ maxLength: 255, minLength: 0, equalTo: 'password' })
  password_confirmation: string;

  @StringField()
  name: string;

  @StringField({ email: true, maxLength: 255, minLength: 0 })
  email: string;
}

export class AuthRegistrationAdminRequestDto {
  @ObjectField(AuthRegistrationAdminRequest)
  admin: AuthRegistrationAdminRequest;
}
