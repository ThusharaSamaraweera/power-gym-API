import { Injectable, Logger } from '@nestjs/common';
// import * as bcrypt from 'bcryptjs';
import { SignupRequestDto } from './dto/signup-request-dto';
import {
  // IJwtToken,
  UserStatus,
} from 'src/common';
import { UserRepository } from '../user/repository/user.repository';
// import { UserDto } from 'src/common/dto/user-dto';
// import { LoginResponse } from './types';
import { UserDocument } from 'src/user/modal';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(logger: Logger, body: SignupRequestDto): Promise<UserDocument> {
    logger.log(`Signup service called with email ${body.email}`);

    // const isFreePackage = body?.packageType === 'FREE';

    const createdUser = await this.userRepository.create({
      ...body,
      status: UserStatus.ACTIVE,
      dateOfBirth: body?.dateOfBirth
        ? new Date(body.dateOfBirth).toISOString()
        : null,
      packageStartDate: null,
      clerkUserId: body.clerkUserId,
    });

    return createdUser;
  }

  // async login(
  //   logger: Logger,
  //   email: string,
  //   password: string,
  //   user: UserDto,
  // ): Promise<LoginResponse> {
  //   logger.log(`Login service called with email ${email}`);

  //   // const isValidPassword = bcrypt.compareSync(password, user.password);

  //   // if (!isValidPassword) {
  //   //   logger.error(`Invalid credentials for email ${email}`);
  //   //   throw new Error('Invalid credentials');
  //   // }

  //   const jwtPayload: IJwtToken = {
  //     id: user._id,
  //     email: user.email,
  //     userRole: user.role,
  //   };

  //   // delete user.password;

  //   return {
  //     user,
  //     accessToken: await this.generateJWT(logger, jwtPayload),
  //   };
  // }

  // async generateJWT(logger: Logger, { id, email, userRole }: IJwtToken) {
  //   logger.log('generateJWT service called');
  //   return this.jwtService.signAsync({ id, email, userRole });
  // }
}
