import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async getUserById(logger: Logger, id: string) {
    logger.log(`getUserById: ${id}`);
    const user = await this.userRepository.findOne({ id });

    if (!user || !user._id) {
      logger.log(`getUserById: ${id} not found`);
      return null;
    }

    return user;
  }
}
