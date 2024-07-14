import { HttpException, Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiPlanService } from './ai.service';

@ApiTags('OpenAi')
@Controller('power-gym-ai')
export class AiController {
  constructor(private readonly aiService: AiPlanService) {}

  @Post('workout-plan')
  async getWorkoutPlan(@Body() body: any) {
    // Get ai plan
    try {
      const workoutPlan = await this.aiService.generateWorkoutPlan(body);
      return workoutPlan;
    } catch (error) {
      throw new HttpException(error, error?.response?.status);
    }
  }
}
