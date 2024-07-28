import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/common/database/mongodb';
import { UserDocument, UserSchema } from 'src/user/modal';
import { UserRepository } from '../user/repository/user.repository';
import { UserService } from 'src/user/user.service';
// import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule.forfeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: `${configService.get('JWT_EXPIRES_IN')}s`,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    ConfigModule,
  ],
  providers: [AuthService, UserRepository, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
