import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { DatabaseModule } from 'src/common/database/mongodb';
import {
  BodyHealthInfoDocument,
  BodyHealthInfoSchema,
  UserDocument,
  UserSchema,
} from './modal';
import { ConfigModule } from 'src/common/config/config.module';
import { UserController } from './user.controller';
import { BodyHealthInfoRepository } from './repository/body-health-info.repository';
import { BodyHealthInfoService } from './bodyHealthInfo.service';
import { LoggerModule } from 'src/common';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule.forfeature([
      { name: UserDocument.name, schema: UserSchema },
      { name: BodyHealthInfoDocument.name, schema: BodyHealthInfoSchema },
    ]),
  ],
  providers: [
    UserService,
    UserRepository,
    BodyHealthInfoRepository,
    BodyHealthInfoService,
  ],
  controllers: [UserController],
})
export class UserModule {}
