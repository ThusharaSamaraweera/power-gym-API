import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/mongodb/abstract.schema';
import { UserRoles, UserStatus } from 'src/common/types';

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
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
