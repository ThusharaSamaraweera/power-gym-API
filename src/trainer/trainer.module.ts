import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerRepository } from './repository/trainer.repository';
import { DatabaseModule } from 'src/common/database/mongodb';
import { TrainerDocument, TrainerSchema } from './modal';
import { ConfigModule } from 'src/common/config/config.module';
import { TrainerController } from './trainer.controller';
import { LoggerModule } from 'src/common';
import { AuthModule } from 'src/auth/auth.module';
import { BodyHealthInfoRepository } from 'src/user/repository/body-health-info.repository';
import { BodyHealthInfoService } from 'src/user/bodyHealthInfo.service';
import {
  BodyHealthInfoDocument,
  BodyHealthInfoSchema,
  UserDocument,
  UserSchema,
} from 'src/user/modal';
import { AiPlanService } from 'src/ai-plan/ai.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule.forfeature([
      { name: TrainerDocument.name, schema: TrainerSchema },
      { name: BodyHealthInfoDocument.name, schema: BodyHealthInfoSchema },
      { name: UserDocument.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  providers: [
    TrainerService,
    TrainerRepository,
    BodyHealthInfoRepository,
    BodyHealthInfoService,
    AiPlanService,
    UserService,
    UserRepository,
  ],
  controllers: [TrainerController],
})
export class TrainerModule {}
