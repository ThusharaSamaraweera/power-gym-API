import { Model, Types } from 'mongoose';
import { CreateBodyHealthInfoDto } from './dto/create-body-health-info-dto';
import { Injectable } from '@nestjs/common';
import { BodyHealthInfoRepository } from './repository/body-health-info.repository';
import { BODY_HEALTH_INFO_RECORD_STATUS } from './types';
import { UserRepository } from './repository/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { BodyHealthInfoDocument } from './modal';

@Injectable()
export class BodyHealthInfoService {
  constructor(
    private readonly bodyHealthInfoRepository: BodyHealthInfoRepository,
    private readonly userRepository: UserRepository,
    @InjectModel(BodyHealthInfoDocument.name)
    private bodyHealthInfoModel: Model<BodyHealthInfoDocument>,
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
      trainerId: new Types.ObjectId(user?.trainerId),
      WorkoutPlan: bodyHealthInfo?.workoutPlan,
    });
  }

  async getBodyHealthInfoByMemberId(
    memberId: Types.ObjectId,
    status: BODY_HEALTH_INFO_RECORD_STATUS,
  ) {
    console.log(`memberId: ${memberId}, status: ${status}`);
    const plans = await this.bodyHealthInfoModel
      .find({
        memberId: memberId,
        status,
      })
      .sort({
        updatedAt: -1,
      });
    console.log(`${plans?.length} plans found for memberId: ${memberId}`);
    return plans;
  }
}
