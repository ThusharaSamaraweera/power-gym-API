import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/mongodb/abstract.schema';
import { UserRoles, UserStatus } from 'src/common';
import { PACKAGE_DURATION, PACKAGE_TYPE } from '../types';

@Schema({ timestamps: true })
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: UserRoles;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  gender: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  status: UserStatus;

  @Prop({
    enum: PACKAGE_TYPE,
    required: false,
  })
  packageType: PACKAGE_TYPE;

  @Prop({
    enum: PACKAGE_DURATION,
    required: false,
    default: undefined,
  })
  packageDuration: PACKAGE_DURATION | null | undefined;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  packageStartDate: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
