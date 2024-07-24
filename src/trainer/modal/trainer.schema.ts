import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/mongodb/abstract.schema';
import { UserStatus } from 'src/common';

@Schema({ timestamps: true })
export class TrainerDocument extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  // @Prop({ required: true })
  // password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true })
  gender: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  status: UserStatus;

  @Prop({
    required: false,
    default: null,
  })
  packageStartDate?: string | null;

  @Prop({
    required: true,
  })
  clerkUserId: string;
}

export const TrainerSchema = SchemaFactory.createForClass(TrainerDocument);
