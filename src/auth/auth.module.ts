import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/common/database/mongodb';
import { UserDocument, UserSchema } from 'src/user/modal';
import { UserRepository } from 'src/user/repository';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule,
    DatabaseModule.forfeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthService, UserRepository, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
