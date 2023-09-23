import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';

export class LoginResponseDto {
  @ApiProperty({
    type: () => UserDto,
  })
  user: UserDto;

  @ApiProperty({
    type: String,
  })
  accessToken: string;
}
