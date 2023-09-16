import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { DatabaseModule } from 'src/common/database/mongodb';
import { UserDocument, UserSchema } from './modal';

@Module({
  imports: [
    DatabaseModule.forfeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService, UserRepository],
})
export class UserModule {}
