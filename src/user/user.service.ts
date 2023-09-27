import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { Types } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UserStatus } from 'src/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async getUserById(logger: Logger, id: Types.ObjectId) {
    logger.log(`getUserById: ${id}`);
    try {
      const user = await this.userRepository.findOne({ id });

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
        password: this.generateRandomPassword(12),
        status: UserStatus.ACTIVE,
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
}
