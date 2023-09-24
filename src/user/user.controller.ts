import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateBodyHealthInfoDto } from './dto/create-body-health-info.dto';
import { Types } from 'mongoose';
import { BodyHealthInfoService } from './bodyHealthInfo.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly bodyHealthInfoService: BodyHealthInfoService) {}

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
}
