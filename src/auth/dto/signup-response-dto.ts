import { ApiProperty } from '@nestjs/swagger';
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
  dateOfBirth: string;

  gender: string;

  image: string;

  phone: string;

  @ApiProperty({
    enum: UserStatus,
  })
  status: UserStatus;

  @ApiProperty({
    enum: PACKAGE_TYPE,
  })
  packageType: PACKAGE_TYPE;
}
