import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BodyInfoDto, HealthInfoDto } from './body-health-info.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBodyHealthInfoDto {
  @ApiProperty()
  @Type(() => BodyInfoDto)
  @IsNotEmpty()
  bodyInfo: BodyInfoDto;

  @ApiProperty()
  @Type(() => HealthInfoDto)
  @IsNotEmpty()
  healthInfo: HealthInfoDto;

  @ApiProperty()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  verifiedBy: string;
}
