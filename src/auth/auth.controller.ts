import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { ServiceLogger } from 'src/common/types';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(ServiceLogger.AUTH_SERVICE);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    // Get user by email if exists
    const existingUser = await this.userService.getUserByEmail(body.email);

    if (existingUser) {
      this.logger.error(`User already exists with email ${body.email}`);
      throw new BadRequestException('User already exists');
    }
    return this.authService.signup(body);
  }
}
