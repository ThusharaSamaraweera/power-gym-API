import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { DatabaseModule } from 'src/common/database/mongodb';
import { UserDocument, UserSchema } from 'src/user/modal';

@Module({
  imports: [
    DatabaseModule.forfeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
