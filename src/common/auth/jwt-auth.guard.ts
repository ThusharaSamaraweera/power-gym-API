import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwtToken = context.switchToHttp().getRequest().headers.authorization;
    console.log(
      '🚀 ~ file: jwt-auth.guard.ts:20 ~ JwtAuthGuard ~ canActivate ~ request',
      jwtToken,
    );
    if (!jwtToken) {
      console.log('No jwt token found in the request header');
      return false;
    }
    const publicKey = this.configService.get('CLERK_PEM_PUBLIC_KEY');
    console.log(
      '🚀 ~ file: jwt-auth.guard.ts:24 ~ JwtAuthGuard ~ publicKey:',
      publicKey,
    );

    try {
      const decoded = jwt.verify(jwtToken, publicKey);
      console.log(
        '🚀 ~ file: jwt-auth.guard.ts:30 ~ JwtAuthGuard ~ decoded:',
        decoded,
      );
      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: jwt-auth.guard.ts:36 ~ JwtAuthGuard ~ error:',
        error,
      );
      return false;
    }
  }
}
