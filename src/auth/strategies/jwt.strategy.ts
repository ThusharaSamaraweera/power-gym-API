import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ServiceLogger } from 'src/common/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(ServiceLogger.AUTH_SERVICE);

  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const jwtToken = request?.headers?.authorization?.split(' ')[1];

          if (jwtToken) {
            this.logger.error('jwtToken is not found in the request header');
            return null;
          }

          this.logger.log('jwtToken is found in the request header');
          return jwtToken;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
}
