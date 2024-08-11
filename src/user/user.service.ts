import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { Model, Types } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user-request-dto';
import { UserRoles, UserStatus } from 'src/common';
import { Clerk } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';
import { BodyHealthInfoDocument, UserDocument } from './modal';
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

  async getAllUsersWithDetails(logger: Logger, trainerId: string = null) {
    logger.log(`getAllUsersWithDetails: ${trainerId}`);

    if (trainerId) {
      const members = await this.userModel
        .find({
          trainerId: trainerId,
        })
        .populate('trainerId');

      const bodyHealthInfo = await this.bodyHealthInfoModel
        .find({
          memberId: { $in: members.map((member) => member._id) },
        })
        .populate('trainerId');

      const usersWithBodyHealthInfo = JSON.parse(JSON.stringify(members));

      // append body health info records to members
      usersWithBodyHealthInfo?.forEach((user) => {
        user.bodyHealthInfo = bodyHealthInfo.filter(
          (info) => info.memberId.toString() === user._id.toString(),
        );
      });

      return usersWithBodyHealthInfo;
    }
  }
}
