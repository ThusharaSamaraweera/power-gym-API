import { IsOptional } from 'class-validator';
import { UserRoles, UserStatus } from '../types';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: String,
  })
  _id: Types.ObjectId;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: UserRoles;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: UserStatus;
}
