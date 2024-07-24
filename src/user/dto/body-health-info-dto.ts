import { ApiProperty } from '@nestjs/swagger';

export class BodyInfoDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  height: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  weight: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  waistCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  hipCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  chestCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  armCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  thighCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  abdomenCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  tricepsCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  supraIliacCircumference: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  waistToHipRatio: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  bodyMassIndex: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  bodyDensity: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  bodyFatPercentage: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  sitAndReach: number;
}

export class HealthInfoDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  restingHeartRate: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  estimatedMaximumHeartRate: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  maximumWeightLifted: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  reps: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  oneRepMax: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  muscularEndurance: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  cardiorespiratoryEndurance: number;

  @ApiProperty({
    type: [String],
    required: false,
  })
  fitnessGoals: string[];

  @ApiProperty({
    type: [String],
    required: false,
  })
  exercisePreferences: string[];

  @ApiProperty({
    type: [String],
    required: false,
  })
  medicalHistory: string[];

  @ApiProperty({
    type: String,
    required: false,
  })
  activityLevel: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  sleepDuration: number;
}
