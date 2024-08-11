import { UserStatus } from '../types';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TRAINER_TYPE } from 'src/trainer/constants';

export class TrainerDto {
  @ApiProperty({
    type: String,
  })
  _id: Types.ObjectId;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: UserStatus;

  @ApiProperty({
    enum: TRAINER_TYPE,
  })
  type: TRAINER_TYPE;
}
