import { ServiceLogger } from './../common/logger/constant';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GPT4_API_URL, EXERCISES } from './ai-plan.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiPlanService {
  private readonly logger = new Logger(ServiceLogger.AI_SERVICE);
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async generateWorkoutPlan(body: object) {
    const prompt = `Based on the following user inputs, generate a structured gym workout plan in JSON format for a week. Include exercises for each day and ensure the plan is comprehensive and detailed. Include rest days. The available exercises are listed below. Each exercise should have a name and frequency (e.g., "3 sets of 10 reps").

      User Inputs: ${JSON.stringify(body, null, 2)}

      Available Exercises: ${EXERCISES.join(', ')}

      Response Format:
      {
          "Day 1": [
              {
                  "exercise": "Bench Press",
                  "frequency": {
                      "sets": 3,
                      "reps": 10
                  }
              },
              {
                  "exercise": "Tricep Dips",
                  "frequency": {
                      "sets": 3,
                      "reps": 15
                  }
              }
          ],
          "Day 2": [
              {
                  "exercise": "Pull-Ups",
                  "frequency": {
                      "sets": 3,
                      "reps": 10
                  }
              },
              {
                  "exercise": "Bent-Over Barbell Rows",
                  "frequency": {
                      "sets": 3,
                      "reps": 10
                  }
              }
          ],
          "Day 3": "Rest",
          "Day 4": [
              {
                  "exercise": "Squats",
                  "frequency": {
                      "sets": 3,
                      "reps": 12
                  }
              },
              {
                  "exercise": "Lunges",
                  "frequency": {
                      "sets": 3,
                      "reps": 12
                  }
              }
          ],
          "Day 5": [
              {
                  "exercise": "Military Press",
                  "frequency": {
                      "sets": 3,
                      "reps": 10
                  }
              },
              {
                  "exercise": "Dumbbell Lateral Raises",
                  "frequency": {
                      "sets": 3,
                      "reps": 12
                  }
              }
          ],
          "Day 6": "Rest",
          "Day 7": [
              {
                  "exercise": "Deadlifts",
                  "frequency": {
                      "sets": 3,
                      "reps": 10
                  }
              },
              {
                  "exercise": "Seated Cable Rows",
                  "frequency": {
                      "sets": 3,
                      "reps": 12
                  }
              }
          ]
      }`;

    this.logger.log(`Request body: ${JSON.stringify(prompt)}`);
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

      const workoutPlan = JSON.parse(
        response?.data?.choices?.[0]?.message?.content,
      );
      this.logger.log(`Workout plan: ${JSON.stringify(workoutPlan)}`);

      return workoutPlan;
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
