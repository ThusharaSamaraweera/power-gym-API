import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() body: any) {
    // Get user by email if exists
    const existingUser = await this.userService.getUserByEmail(body.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    return this.authService.signup(body);
  }
}
