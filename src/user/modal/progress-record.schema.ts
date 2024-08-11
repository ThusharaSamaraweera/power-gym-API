import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ProgressRecord } from '../types';

@Schema({
  timestamps: true,
})
export class ProgressRecordDocument {
  @Prop({ required: true, ref: 'UserDocument', type: Types.ObjectId })
  memberId: Types.ObjectId;

  @Prop({ required: true, type: ProgressRecord })
  progressRecord: ProgressRecord;

  @Prop({ length: 500 })
  note: string;

  @Prop({ required: false })
  verifiedBy: string;
}

export const ProgressRecordSchema = SchemaFactory.createForClass(
  ProgressRecordDocument,
);
