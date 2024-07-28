import { Types } from 'mongoose';
import { CreateBodyHealthInfoDto } from './dto/create-body-health-info-dto';
import { Injectable } from '@nestjs/common';
import { BodyHealthInfoRepository } from './repository/body-health-info.repository';
import { BODY_HEALTH_INFO_RECORD_STATUS } from './types';

@Injectable()
export class BodyHealthInfoService {
  constructor(
    private readonly bodyHealthInfoRepository: BodyHealthInfoRepository,
  ) {}

  async createBodyHealthInfo(
    bodyHealthInfo: CreateBodyHealthInfoDto,
    memberId: Types.ObjectId,
  ) {
    return await this.bodyHealthInfoRepository.create({
      memberId: memberId,
      bodyHealthInfo: bodyHealthInfo.bodyHealthInfo,
      note: bodyHealthInfo?.note,
      verifiedBy: bodyHealthInfo?.verifiedBy,
      status: BODY_HEALTH_INFO_RECORD_STATUS.PENDING,
      trainerId: bodyHealthInfo.trainerId,
      WorkoutPlan: bodyHealthInfo.workoutPlan,
    });
  }
}
