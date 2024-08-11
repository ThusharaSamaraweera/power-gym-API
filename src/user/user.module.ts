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
import { AuthModule } from 'src/auth/auth.module';
import {
  ProgressRecordDocument,
  ProgressRecordSchema,
} from './modal/progress-record.schema';
import { ProgressRecordService } from './progressRecord.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule.forfeature([
      { name: UserDocument.name, schema: UserSchema },
      { name: BodyHealthInfoDocument.name, schema: BodyHealthInfoSchema },
      { name: ProgressRecordDocument.name, schema: ProgressRecordSchema },
    ]),
    AuthModule,
  ],
  providers: [
    UserService,
    UserRepository,
    BodyHealthInfoRepository,
    BodyHealthInfoService,
    ProgressRecordService,
  ],
  controllers: [UserController],
})
export class UserModule {}
