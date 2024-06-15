import { ServiceLogger } from './../common/logger/constant';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { API_KEY, API_URL } from './ai-plan.constants';

@Injectable()
export class AiPlanService {
  private readonly logger = new Logger(ServiceLogger.AI_SERVICE);
  constructor() {}

  async generateWorkoutPlan(body: object) {
    const prompt = `Generate a gym workout plan based on the following user inputs:\n\n${JSON.stringify(
      body,
    )}`;
    console.log(body);
    this.logger.log(prompt);

    try {
      const response = await axios.post(
        API_URL,
        {
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-4',
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
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
