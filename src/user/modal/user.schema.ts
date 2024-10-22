import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/mongodb/abstract.schema';
import { UserRoles, UserStatus } from 'src/common';
import { PACKAGE_TYPE } from '../types';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  // @Prop({ required: true })
  // password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: UserRoles;

  @Prop({ required: false })
  dateOfBirth: string;

  @Prop({ required: false })
  gender: string;

  @Prop()
  image?: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: true })
  status: UserStatus;

  @Prop({
    enum: PACKAGE_TYPE,
    required: false,
  })
  packageType?: PACKAGE_TYPE;

  // @Prop({
  //   enum: PACKAGE_DURATION,
  //   required: false,
  //   default: undefined,
  // })
  // packageDuration?: PACKAGE_DURATION | null | undefined;

  @Prop({
    required: false,
    default: null,
  })
  packageStartDate?: string | null;

  @Prop({
    required: true,
  })
  clerkUserId: string;

  @Prop({
    required: false,
    ref: 'UserDocument',
    type: Types.ObjectId,
  })
  trainerId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
