import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BodyHealthInfoDto } from './body-health-info-dto';
import { WorkoutPlanDto } from 'src/ai-plan/dto/ai-plan.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBodyHealthInfoDto {
  // @ApiProperty()
  // @Type(() => BodyInfoDto)
  // @IsNotEmpty()
  // bodyInfo: BodyInfoDto;

  // @ApiProperty()
  // @Type(() => HealthInfoDto)
  // @IsNotEmpty()
  // healthInfo: HealthInfoDto;

  @ApiProperty()
  @IsNotEmpty()
  bodyHealthInfo: BodyHealthInfoDto;

  @ApiProperty()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  note: string;

  @ApiProperty({
    type: String,
    format: 'email',
    description: 'Email of the user who verified the body health info',
  })
  @IsEmail()
  @IsNotEmpty()
  verifiedBy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trainerId: string;

  @ApiProperty()
  @Type(() => WorkoutPlanDto)
  @IsOptional()
  workoutPlan: WorkoutPlanDto;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;
}
