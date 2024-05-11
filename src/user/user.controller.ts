import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBodyHealthInfoDto } from './dto/create-body-health-info-dto';
import { Types } from 'mongoose';
import { BodyHealthInfoService } from './bodyHealthInfo.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dto/create-user-request-dto';
import { UserService } from './user.service';
import { ServiceLogger } from 'src/common';

@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(ServiceLogger.USER_SERVICE);
  constructor(
    private readonly bodyHealthInfoService: BodyHealthInfoService,
    private readonly userService: UserService,
  ) {}

  @Post(':userId/body-health-info')
  async createBodyHealthInfo(
    @Body() payload: CreateBodyHealthInfoDto,
    @Query('userId') memberId: Types.ObjectId,
  ) {
    return await this.bodyHealthInfoService.createBodyHealthInfo(
      payload,
      memberId,
    );
  }

  @Post('/')
  async createUser(@Body() payload: CreateUserRequestDto) {
    const existingUser = await this.userService.getUserByEmail(payload.email);

    if (existingUser) {
      this.logger.error(`User already exists with email ${payload.email}`);
      throw new BadRequestException('User already exists');
    }

    return this.userService.createUser(this.logger, payload);
  }
}
