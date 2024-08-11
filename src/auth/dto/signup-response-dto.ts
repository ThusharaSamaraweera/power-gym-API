import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserRoles, UserStatus } from 'src/common';
import { PACKAGE_TYPE } from 'src/user/types';

export class SignupResponseDto {
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    enum: UserRoles,
  })
  role: UserRoles;

  @ApiProperty({
    type: String,
  })
  dateOfBirth?: string;

  @ApiProperty({
    type: String,
  })
  gender?: string;

  @ApiProperty({
    type: String,
  })
  image?: string;

  @ApiProperty({
    type: String,
  })
  phone?: string;

  @ApiProperty({
    enum: PACKAGE_TYPE,
  })
  packageType?: PACKAGE_TYPE;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  clerkUserId: string;
}
