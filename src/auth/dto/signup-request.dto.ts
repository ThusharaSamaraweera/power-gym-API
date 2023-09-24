import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/common/types';

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
}
