import {
  DIETARY_RESTRICTIONS,
  FITNESS_GOAL,
  DESIRED_RATE_OF_PROGRESS,
  ACTIVITY_LEVEL,
} from '../ai-plan.constants';
import { ApiProperty } from '@nestjs/swagger';

export class BodyInfo {
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
    required: true,
  })
  age: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Body fat percentage',
  })
  bodyFatPercentage?: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  muscleMass?: number;
}

export class HealthInfo {
  @ApiProperty({
    type: Number,
    required: false,
  })
  anyMedicalConditions: number;

  @ApiProperty({
    type: String,
    required: false,
    enum: DIETARY_RESTRICTIONS,
  })
  dietaryRestrictions: string;

  @ApiProperty({
    type: [String],
    required: false,
  })
  medications: string[];

  @ApiProperty({
    type: String,
    required: false,
    enum: FITNESS_GOAL,
  })
  fitnessGoal: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: DESIRED_RATE_OF_PROGRESS,
  })
  desiredRateOfProgress: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: ACTIVITY_LEVEL,
  })
  activityLevel: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  eatingPatterns: string;

  @ApiProperty({
    type: String,
    required: false,
    description:
      'Allow users to describe their meal timing (Ex: Regular, Irregular)',
  })
  mealTiming: string;

  @ApiProperty({
    type: String, // Assuming a string for snacking habits
    required: false,
    description:
      'Allow users to describe their snacking habits (Ex: Occasional, Frequent)',
  })
  snackingHabits: string;
}
