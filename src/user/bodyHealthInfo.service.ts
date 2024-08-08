import { Types } from 'mongoose';
import { CreateBodyHealthInfoDto } from './dto/create-body-health-info-dto';
import { Injectable } from '@nestjs/common';
import { BodyHealthInfoRepository } from './repository/body-health-info.repository';
import { BODY_HEALTH_INFO_RECORD_STATUS } from './types';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class BodyHealthInfoService {
  constructor(
    private readonly bodyHealthInfoRepository: BodyHealthInfoRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createBodyHealthInfo(
    bodyHealthInfo: CreateBodyHealthInfoDto,
    memberId: Types.ObjectId,
  ) {
    const user = await this.userRepository.findOne({
      _id: memberId,
    });
    console.log(
      '🚀 ~ file: bodyHealthInfo.service.ts:27 ~ BodyHealthInfoService ~ trainerId:',
      user,
    );
    return await this.bodyHealthInfoRepository.create({
      memberId: memberId,
      bodyHealthInfo: bodyHealthInfo.bodyHealthInfo,
      note: bodyHealthInfo?.note,
      verifiedBy: bodyHealthInfo?.verifiedBy,
      status: bodyHealthInfo?.status || BODY_HEALTH_INFO_RECORD_STATUS.PENDING,
      trainerId: user?.trainerId,
      WorkoutPlan: bodyHealthInfo?.workoutPlan,
    });
  }
}
