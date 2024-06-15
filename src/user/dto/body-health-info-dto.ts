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
    required: true,
    description: 'Body fat percentage',
  })
  fat: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  muscleMass?: number;
}

export class HealthInfoDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  bloodPressure: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  heartRate: number;
}
