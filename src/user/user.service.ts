import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { Types } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user-request-dto';
import { UserStatus } from 'src/common';
import { Clerk } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
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

  async getAllUsersFromDb(logger: Logger) {
    logger.log('getAllUsersFromDb called');
    return this.userRepository.find();
  }
}
