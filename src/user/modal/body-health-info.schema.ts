import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/mongodb';
import { BodyHealthInfoDto } from '../dto/body-health-info-dto';
import { WorkoutPlanDto } from 'src/ai-plan/dto/ai-plan.dto';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class BodyHealthInfoDocument extends AbstractDocument {
  @Prop({ required: true })
  memberId: Types.ObjectId;

  // @Prop({ type: BodyInfoDto })
  // BodyInfo: BodyInfoDto;

  // @Prop({ type: HealthInfoDto })
  // HealthInfo: HealthInfoDto;

  @Prop({ required: true, type: BodyHealthInfoDto })
  bodyHealthInfo: BodyHealthInfoDto;

  @Prop({ length: 500 })
  note: string;

  @Prop({ required: false })
  verifiedBy: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  trainerId: string;

  @Prop({ type: WorkoutPlanDto, required: false })
  WorkoutPlan: WorkoutPlanDto;
}

export const BodyHealthInfoSchema = SchemaFactory.createForClass(
  BodyHealthInfoDocument,
);
