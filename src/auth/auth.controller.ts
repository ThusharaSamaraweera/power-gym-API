import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignupRequestDto } from './dto/signup-request.dto';
import { UserDocument } from 'src/user/modal';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignupResponseDto } from './dto/signup-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ServiceLogger } from 'src/common';
import { PACKAGE_TYPE } from 'src/user/types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(ServiceLogger.AUTH_SERVICE);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiCreatedResponse({ type: SignupResponseDto })
  @Post('signup')
  async signup(@Body() body: SignupRequestDto) {
    // Get user by email if exists
    const existingUser = await this.userService.getUserByEmail(body.email);

    if (existingUser) {
      this.logger.error(`User already exists with email ${body.email}`);
      throw new BadRequestException('User already exists');
    }

    // Check if package duration is available for provided package type
    if (
      [PACKAGE_TYPE.BASIC, PACKAGE_TYPE.PREMIUM].includes(body.packageType) &&
      !body.packageDuration
    ) {
      this.logger.error(
        `Package duration is required for package type ${body.packageType}`,
      );
      throw new BadRequestException(
        `Package duration is required for package type ${body.packageType}`,
      );
    }
    return this.authService.signup(this.logger, body);
  }

  @ApiCreatedResponse({ type: LoginResponseDto })
  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    const existingUser: UserDocument = await this.userService.getUserByEmail(
      body.email,
    );

    if (!existingUser || !existingUser._id) {
      this.logger.error(`User not found with email ${body.email}`);
      throw new BadRequestException('Invalid credentials');
    }
    return await this.authService.login(
      this.logger,
      body.email,
      body.password,
      existingUser,
    );
  }
}
