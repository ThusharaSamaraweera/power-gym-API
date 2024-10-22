import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ServiceLogger } from 'src/common';
import { IJwtToken } from 'src/common';
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
          console.log(
            '🚀 ~ file: jwt.strategy.ts:22 ~ JwtAuthGuard ~ classJwtAuthGuardextendsPassportStrategy ~ jwtToken:',
            jwtToken,
          );

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

  async validate({ id }: IJwtToken) {
    this.logger.log(`Validating user with id: ${id}`);
    return this.userService.getUserById(this.logger, id);
  }
}
