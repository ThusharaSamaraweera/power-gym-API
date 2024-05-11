import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/common';

export class CreateUserRequestDto {
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
  @IsIn([UserRoles.ADMIN, UserRoles.TRAINER])
  @IsNotEmpty()
  role: UserRoles;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
