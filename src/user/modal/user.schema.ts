import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/mongodb/abstract.schema';
import { UserRoles, UserStatus } from 'src/common/types';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  role: UserRoles;

  @Prop()
  dateOfBirth: string;

  @Prop()
  gender: string;

  @Prop()
  image: string;

  @Prop()
  phone: string;

  @Prop()
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
