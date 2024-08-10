import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Param,
  Put,
  // UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { CreateTrainerRequestDto } from './dto/create-trainer-request-dto';
import { TrainerService } from './trainer.service';
import { ServiceLogger } from 'src/common';

@ApiTags('Trainers')
@Controller('trainers')
export class TrainerController {
  private readonly logger = new Logger(ServiceLogger.TRAINER_SERVICE);
  constructor(private readonly trainerService: TrainerService) {}

  @Post('/')
  async createTrainer(@Body() payload: CreateTrainerRequestDto) {
    const existingTrainer = await this.trainerService.getTrainerByEmail(
      this.logger,
      payload.email,
    );

    if (existingTrainer) {
      this.logger.error(`Trainer already exists with email ${payload.email}`);
      throw new BadRequestException(
        `Trainer already exists with email ${payload.email}`,
      );
    }

    return this.trainerService.createTrainer(this.logger, payload);
  }

  @Get('')
  async getAllTrainers() {
    return await this.trainerService.getAllTrainersFromDb(this.logger);
  }

  @Get(':trainerId')
  async getTrainerById(@Param('trainerId') trainerId: string) {
    const trainerDocumentId = new Types.ObjectId(trainerId);
    return await this.trainerService.getTrainerById(
      this.logger,
      trainerDocumentId,
    );
  }

  @Get(':trainerId/plans/:bodyHealthInfoId/generate')
  async generateAiExercisePlan(
    @Param('trainerId') trainerId: string,
    @Param('bodyHealthInfoId') bodyHealthInfoId: string,
  ) {
    const bodyHealthInfoDocumentId = new Types.ObjectId(bodyHealthInfoId);
    return await this.trainerService.generateAiExercisePlan(
      this.logger,
      bodyHealthInfoDocumentId,
    );
  }

  @Get(':trainerId/plans')
  async getRequestedExercisePlansByTrainerId(
    @Param('trainerId') trainerId: string,
    @Query('status') status: string,
  ) {
    return await this.trainerService.getRequestedExercisePlansByTrainerId(
      this.logger,
      trainerId,
      status,
    );
  }

  @Put(':trainerId/plans/:bodyHealthInfoId')
  async submitWorkoutPlan(
    @Body() payload: any,
    @Param('trainerId') trainerId: string,
    @Param('bodyHealthInfoId') bodyHealthInfoId: string,
  ) {
    const bodyHealthInfoDocumentId = new Types.ObjectId(bodyHealthInfoId);
    return await this.trainerService.submitWorkoutPlan(
      this.logger,
      bodyHealthInfoDocumentId,
      payload,
    );
  }
}
