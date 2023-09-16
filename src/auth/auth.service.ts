import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { ServiceLogger, UserStatus } from 'src/common/types';
import { UserRepository } from 'src/user/repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(ServiceLogger.AUTH_SERVICE);

  constructor(private readonly userRepository: UserRepository) {}

  async signup(body: SignupDto) {
    this.logger.log(`Signup service called with email ${body.email}`);
    return await this.userRepository.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
      status: UserStatus.ACTIVE,
    });
  }
}
