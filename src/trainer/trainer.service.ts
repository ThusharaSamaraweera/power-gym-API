import { BODY_HEALTH_INFO_RECORD_STATUS } from './../user/types';
import { Injectable, Logger } from '@nestjs/common';
import { BodyHealthInfoRepository } from 'src/user/repository/body-health-info.repository';
import { UserRepository } from 'src/user//repository/user.repository';
import { Model, Types } from 'mongoose';
import { CreateTrainerRequestDto } from './dto/create-trainer-request-dto';
import { UserStatus } from 'src/common';
import { ConfigService } from '@nestjs/config';
import { AiPlanService } from './../ai-plan/ai.service';
import { UserRoles } from 'src/common';
import { NotFoundException } from '@nestjs/common';
import { BodyHealthInfoDocument } from 'src/user/modal';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TrainerService {
  constructor(
    private readonly bodyHealthInfoRepository: BodyHealthInfoRepository,
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
    private aiPlanService: AiPlanService,
    @InjectModel(BodyHealthInfoDocument.name)
    private bodyHealthInfoModel: Model<BodyHealthInfoDocument>,
  ) {}

  async getTrainerByEmail(logger: Logger, email: string) {
    logger.log(`getTrainerByEmail: ${email}`);
    try {
      const trainer = await this.userRepository.findOne({
        email,
        role: UserRoles.TRAINER,
      });

      if (!trainer || !trainer.email) {
        logger.log(`Trainer with email ${email} not found`);
        return null;
      }

      return trainer;
    } catch (error) {
      logger.error(
        `getTrainerByEmail: ${email} error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async getTrainerById(logger: Logger, _id: Types.ObjectId) {
    logger.log(`getTrainerById: ${_id}`);
    try {
      const trainer = await this.userRepository.findOne({
        _id,
        role: UserRoles.TRAINER,
      });

      if (!trainer || !trainer._id) {
        logger.log(`Trainer with id ${_id} not found`);
        throw new NotFoundException(`Trainer with id ${_id} not found`);
      }

      return trainer;
    } catch (error) {
      logger.error(`getTrainerById: ${_id} error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async createTrainer(logger: Logger, newTrainer: CreateTrainerRequestDto) {
    logger.log(`Create trainer: ${JSON.stringify(newTrainer)}`);

    try {
      return await this.userRepository.create({
        ...newTrainer,
        dateOfBirth: newTrainer.dateOfBirth,
        status: UserStatus.ACTIVE,
        clerkUserId: newTrainer.clerkUserId,
        role: UserRoles.TRAINER,
      });
    } catch (error) {
      logger.error(
        `Create trainer: ${newTrainer?.email} error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  // generateRandomPassword(passwordLength) {
  //   let password: string;
  //   const chars =
  //     '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   for (let i = 0; i <= passwordLength; i++) {
  //     const randomNumber = Math.floor(Math.random() * chars.length);
  //     password += chars.substring(randomNumber, randomNumber + 1);
  //   }
  //   return password;
  // }

  // async getAllUsersFromClerk(logger: Logger) {
  //   logger.log('getAllUsersFromClerk');
  //   const clerkClient = Clerk({
  //     secretKey: this.configService.get<string>('CLERK_SECRET_KEY'),
  //   });

  //   const userList = await clerkClient.users.getUserList();

  //   return userList;
  // }

  async getAllTrainersFromDb(logger: Logger) {
    logger.log('getAllTrainersFromDb called');
    return this.userRepository.find({
      role: UserRoles.TRAINER,
    });
  }

  async generateAiExercisePlan(
    logger: Logger,
    bodyHealthInfoId: Types.ObjectId,
  ) {
    logger.log(`bodyHealthInfoId: ${bodyHealthInfoId}`);
    try {
      const bodyHealthInfo = await this.bodyHealthInfoRepository.findOne({
        _id: bodyHealthInfoId,
      });
      logger.log(`Body health info: ${JSON.stringify(bodyHealthInfo)}`);

      if (!bodyHealthInfo || !bodyHealthInfo._id) {
        logger.log(
          `bodyHealthInfo with object id ${bodyHealthInfoId} not found`,
        );
        throw new NotFoundException(
          `bodyHealthInfo with object id ${bodyHealthInfoId} not found`,
        );
      }

      const workoutPlan = await this.aiPlanService.generateWorkoutPlan(
        bodyHealthInfo.bodyHealthInfo,
      );
      logger.log(`Generated workout plan: ${JSON.stringify(workoutPlan)}`);

      return workoutPlan;
    } catch (error) {
      logger.error(
        `bodyHealthInfoId: ${bodyHealthInfoId} error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async getRequestedExercisePlansByTrainerId(
    logger: Logger,
    trainerId: string,
    status: string,
  ) {
    logger.log(`Get ${status} exercise plans for trainer ${trainerId}`);
    try {
      const requestedPlans = await this.bodyHealthInfoModel
        .find({
          trainerId,
          status,
        })
        .populate('memberId');

      logger.log(
        `Requested plans for trainer ${trainerId}: ${JSON.stringify(
          requestedPlans,
        )}`,
      );

      return requestedPlans;
    } catch (error) {
      logger.error(
        `Get ${status} exercise plans for trainer ${trainerId} error: ${JSON.stringify(
          error,
        )}`,
      );
      throw error;
    }
  }

  async submitWorkoutPlan(
    logger: Logger,
    bodyHealthInfoId: Types.ObjectId,
    updatedWorkoutPlan: any,
  ) {
    logger.log(`submitWorkoutPlan: ${bodyHealthInfoId}`);
    try {
      const bodyHealthInfo =
        await this.bodyHealthInfoRepository.findOneAndUpdate(
          {
            _id: bodyHealthInfoId,
          },
          {
            WorkoutPlan: updatedWorkoutPlan,
            status: BODY_HEALTH_INFO_RECORD_STATUS.COMPLETED,
          },
        );
      logger.log(`Body health info: ${JSON.stringify(bodyHealthInfo)}`);

      return bodyHealthInfo;
    } catch (error) {
      logger.error(
        `bodyHealthInfoId: ${bodyHealthInfoId} error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }
}
