import { HttpException, Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AiPlanService } from './ai.service';
import { BodyInfo } from './dto/ai-plan.dto';

@ApiTags('OpenAi')
@Controller('power-gym-ai')
export class AiController {
  constructor(private readonly aiService: AiPlanService) {}

  @Post('workout-plan')
  async getWorkoutPlan(@Body() body: BodyInfo) {
    console.log(body?.height);
    // Get ai plan
    try {
      const workoutPlan = await this.aiService.generateWorkoutPlan(body);
      return workoutPlan;
    } catch (error) {
      throw new HttpException(error, error?.response?.status);
    }
  }
}
