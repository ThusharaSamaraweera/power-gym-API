import { IsOptional } from 'class-validator';
import { UserRoles, UserStatus } from '../types';
import { Types } from 'mongoose';

export class UserDto {
  _id: Types.ObjectId;
  email: string;

  @IsOptional()
  password: string;

  name: string;

  role: UserRoles;

  dateOfBirth: string;

  gender: string;

  image: string;

  phone: string;

  status: UserStatus;
}
