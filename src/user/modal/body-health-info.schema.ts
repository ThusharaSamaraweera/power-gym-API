import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/mongodb';
import { BodyInfo, HealthInfo } from '../types';

@Schema({ timestamps: true })
export class BodyHealthInfoDocument extends AbstractDocument {
  @Prop({ required: true })
  memberId: string;

  @Prop({ type: Object })
  BodyInfo: BodyInfo;

  @Prop({ type: Object })
  HealthInfo: HealthInfo;

  @Prop({ length: 500 })
  note: string;

  @Prop({ required: true })
  verifiedBy: string;
}

export const BodyHealthInfoSchema = SchemaFactory.createForClass(
  BodyHealthInfoDocument,
);
