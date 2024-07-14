import { ServiceLogger } from './../common/logger/constant';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GPT4_API_URL } from './ai-plan.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiPlanService {
  private readonly logger = new Logger(ServiceLogger.AI_SERVICE);
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async generateWorkoutPlan(body: object) {
    const prompt = `Generate a gym workout plan based on the following user inputs:\n\n${JSON.stringify(
      body,
    )}`;
    this.logger.log(prompt);
    const secretKey = this.configService.get<string>('GPT4_API_KEY');

    try {
      const response = await axios.post(
        GPT4_API_URL,
        {
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-4',
        },
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response?.data?.choices;
    } catch (error) {
      this.logger.error(
        `Error while generating workout plan: ${JSON.stringify(
          error?.response?.data?.error,
        )}`,
      );
      throw error;
    }
  }
}
