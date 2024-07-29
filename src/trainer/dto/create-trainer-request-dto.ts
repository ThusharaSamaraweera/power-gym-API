import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTrainerRequestDto {
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

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  clerkUserId: string;
}
