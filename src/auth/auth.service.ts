import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(body: any) {
    return await this.userRepository.create({
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    });
  }
}
