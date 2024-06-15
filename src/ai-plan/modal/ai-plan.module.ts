import { Module } from '@nestjs/common';
import { AiController } from '../ai.controller';
import { AiPlanService } from '../ai.service';

@Module({
  providers: [AiPlanService],
  controllers: [AiController],
})
export class AiPlanModule {}
