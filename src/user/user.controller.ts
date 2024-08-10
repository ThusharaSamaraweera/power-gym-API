import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Param,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { CreateBodyHealthInfoDto } from './dto/create-body-health-info-dto';
import { Types } from 'mongoose';
import { BodyHealthInfoService } from './bodyHealthInfo.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dto/create-user-request-dto';
import { UserService } from './user.service';
import { ServiceLogger } from 'src/common';
import { BODY_HEALTH_INFO_RECORD_STATUS } from './types';
// import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(ServiceLogger.USER_SERVICE);
  constructor(
    private readonly bodyHealthInfoService: BodyHealthInfoService,
    private readonly userService: UserService,
  ) {}

  @Post('/')
  async createUser(@Body() payload: CreateUserRequestDto) {
    const existingUser = await this.userService.getUserByEmail(payload.email);

    if (existingUser) {
      this.logger.error(`User already exists with email ${payload.email}`);
      throw new BadRequestException('User already exists');
    }

    return this.userService.createUser(this.logger, payload);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllUsers(@Query('userRoles') userRoles: string) {
    return await this.userService.getAllUsersFromDb(this.logger, userRoles);
  }

  @Get('/details')
  async getAllUsersWithDetails(@Query('trainerId') trainerId: string) {
    return await this.userService.getAllUsersWithDetails(
      this.logger,
      trainerId,
    );
  }

  @Get('/:clerkUserId')
  async getUserById(@Param('clerkUserId') clerkUserId: string) {
    return await this.userService.getUserById(this.logger, clerkUserId);
  }

  @Post(':userId/body-health-info')
  async createBodyHealthInfo(
    @Body() payload: CreateBodyHealthInfoDto,
    @Param('userId') userId: string,
  ) {
    const memberId = new Types.ObjectId(userId);
    return await this.bodyHealthInfoService.createBodyHealthInfo(
      payload,
      memberId,
    );
  }

  @Get(':userId/body-health-info')
  async getBodyHealthInfoByMemberId(
    @Param('userId') userId: string,
    @Query('status') status: BODY_HEALTH_INFO_RECORD_STATUS,
  ) {
    const memberId = new Types.ObjectId(userId);
    return await this.bodyHealthInfoService.getBodyHealthInfoByMemberId(
      memberId,
      status,
    );
  }
}
