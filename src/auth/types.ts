import { UserDto } from 'src/common/dto/user-dto';

export interface LoginResponse {
  user: UserDto;
  accessToken: string;
}
