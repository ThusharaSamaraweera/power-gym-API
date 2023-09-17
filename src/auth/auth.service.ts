import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { IJwtToken, UserStatus } from 'src/common/types';
import { UserRepository } from 'src/user/repository';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/common/dto/user.dto';
import { LoginResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(logger: Logger, body: SignupDto) {
    logger.log(`Signup service called with email ${body.email}`);
    return await this.userRepository.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
      status: UserStatus.ACTIVE,
    });
  }

  async login(
    logger: Logger,
    email: string,
    password: string,
    user: UserDto,
  ): Promise<LoginResponse> {
    logger.log(`Login service called with email ${email}`);

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      logger.error(`Invalid credentials for email ${email}`);
      throw new Error('Invalid credentials');
    }

    const jwtPayload: IJwtToken = {
      id: user._id,
      email: user.email,
      userRole: user.role,
    };

    delete user.password;
    return {
      user,
      accessToken: await this.generateJWT(logger, jwtPayload),
    };
  }

  async generateJWT(logger: Logger, { id, email, userRole }: IJwtToken) {
    logger.log('generateJWT service called');
    return this.jwtService.signAsync({ id, email, userRole });
  }
}
