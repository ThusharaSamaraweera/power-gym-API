import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/common';
import { PACKAGE_DURATION, PACKAGE_TYPE } from 'src/user/types';

export class SignupRequestDto {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsIn([UserRoles.MEMBER])
  @IsNotEmpty()
  role: UserRoles;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    required: true,
    enum: PACKAGE_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(PACKAGE_TYPE)
  @IsString()
  packageType: PACKAGE_TYPE;

  @ApiProperty({
    required: false,
    enum: PACKAGE_DURATION,
  })
  @IsEnum(PACKAGE_DURATION)
  @IsOptional()
  packageDuration: PACKAGE_DURATION;
}
