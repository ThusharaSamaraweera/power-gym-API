import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { Model, Types } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user-request-dto';
import { UserRoles, UserStatus } from 'src/common';
import { Clerk } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';
import {
  BodyHealthInfoDocument,
  ProgressRecordDocument,
  UserDocument,
} from './modal';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
    @InjectModel(BodyHealthInfoDocument.name)
    private bodyHealthInfoModel: Model<BodyHealthInfoDocument>,
    @InjectModel(UserDocument.name)
    private userModel: Model<UserDocument>,
    @InjectModel(ProgressRecordDocument.name)
    private progressRecordModel: Model<ProgressRecordDocument>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async getUserById(logger: Logger, id: string) {
    logger.log(`getUserById: clerk user id ${id}`);
    try {
      const user = await this.userRepository.findOne({ clerkUserId: id });

      if (!user || !user._id) {
        logger.log(`getUserById: ${id} not found`);
        return null;
      }

      return user;
    } catch (error) {
      logger.error(`getUserById: ${id} error: ${error}`);
      throw error;
    }
  }

  async createUser(logger: Logger, newUser: CreateUserRequestDto) {
    logger.log(`createUser: ${JSON.stringify(newUser)}`);

    try {
      return await this.userRepository.create({
        ...newUser,
        dateOfBirth: newUser.dateOfBirth,
        status: UserStatus.ACTIVE,
        clerkUserId: newUser.clerkUserId,
      });
    } catch (error) {
      logger.error(`createUser: ${newUser?.email} error: ${error}`);
      throw error;
    }
  }

  generateRandomPassword(passwordLength) {
    let password: string;
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

  async getAllUsersFromClerk(logger: Logger) {
    logger.log('getAllUsersFromClerk');
    const clerkClient = Clerk({
      secretKey: this.configService.get<string>('CLERK_SECRET_KEY'),
    });

    const userList = await clerkClient.users.getUserList();

    return userList;
  }

  async getAllUsersFromDb(logger: Logger, roles: string) {
    logger.log(`getAllUsersFromDb: ${roles} roles`);

    const rolesArray = roles.split(',');

    const users = await this.userRepository.find({
      role: { $in: rolesArray },
    });

    return users;
  }

  async getAllUsersWithDetails(
    logger: Logger,
    trainerId: string = null,
    // roles: string = null,
  ) {
    logger.log(`getAllUsersWithDetails: ${trainerId}`);

    let usersWithBodyHealthInfo = [];

    if (trainerId) {
      const members = await this.userModel
        .find({
          trainerId: trainerId,
        })
        .populate('trainerId');

      logger.log(`${members?.length} members found for trainer ${trainerId}`);

      usersWithBodyHealthInfo = JSON.parse(JSON.stringify(members));
    } else {
      // const userRoles: UserRoles = roles?.split(',') as unknown as UserRoles;

      const users = await this.userModel.find().populate('trainerId');

      logger.log(`${users?.length} users found`);
      usersWithBodyHealthInfo = JSON.parse(JSON.stringify(users));
    }

    const bodyHealthInfo = await this.bodyHealthInfoModel.find({
      memberId: {
        $in: usersWithBodyHealthInfo.map(
          (member) => new Types.ObjectId(member._id),
        ),
      },
    });
    // .populate('trainerId');

    logger.log(`${bodyHealthInfo?.length} body health info records found`);

    // append body health info records to members
    usersWithBodyHealthInfo?.forEach((user) => {
      user.bodyHealthInfo = bodyHealthInfo.filter(
        (info) => info.memberId.toString() === user._id.toString(),
      );
    });

    const progressRecords = await this.progressRecordModel.find({
      memberId: {
        $in: usersWithBodyHealthInfo.map(
          (member) => new Types.ObjectId(member._id),
        ),
      },
    });

    logger.log(`${progressRecords?.length} progress records found`);

    // append progress records to members
    usersWithBodyHealthInfo?.forEach((user) => {
      user.progressRecords = progressRecords.filter(
        (record) => record.memberId.toString() === user._id.toString(),
      );
    });

    return usersWithBodyHealthInfo;
  }

  async updateUser(logger: Logger, payload: any, userId: Types.ObjectId) {
    logger.log(`updateUser: ${userId}`);

    const updatingUser = {
      trainerId: new Types.ObjectId(payload?.trainerId),
    };
    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: updatingUser },
      { new: true },
    );
  }
}
