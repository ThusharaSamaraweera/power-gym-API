import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  // IsDate,
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
import { PACKAGE_TYPE } from 'src/user/types';

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
  @IsOptional()
  dateOfBirth: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
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
  // @IsNotEmpty()
  @IsOptional()
  phone: string;

  @ApiProperty({
    // required: true,
    enum: PACKAGE_TYPE,
  })
  // @IsNotEmpty()
  // @IsEnum(PACKAGE_TYPE)
  // @IsString()
  packageType: PACKAGE_TYPE;

  // @ApiProperty({
  //   required: false,
  //   enum: PACKAGE_DURATION,
  // })
  // @IsEnum(PACKAGE_DURATION)
  // @IsOptional()
  // packageDuration: PACKAGE_DURATION;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  clerkUserId: string;
}
