import { ServiceLogger } from './../common/logger/constant';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {
  GPT4_API_URL,
  STRENGTH_EXERCISES,
  CARDIO_EXERCISES,
} from './ai-plan.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiPlanService {
  private readonly logger = new Logger(ServiceLogger.AI_SERVICE);
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async generateWorkoutPlan(body: object) {
    const prompt = `Based on the following user inputs, generate a structured gym workout plan in JSON format. The plan should cover 7 days. Include exercises for each day and ensure the plan is comprehensive and detailed. Include rest days. Ensure each workout day includes at least one cardio exercise. The available exercises are listed below. Each exercise should have a name and frequency. For strength exercises, use "sets" and "reps" (e.g., { "sets": 3, "reps": 15 }). For cardio exercises like Cycling (Stationary Bike) and Running (Treadmill), use "duration" (e.g., { "duration": "30 minutes" }).

      User Inputs: ${JSON.stringify(body, null, 2)}

      Available Strength Exercises: ${STRENGTH_EXERCISES.join(', ')}
      Available Cardio Exercises: ${CARDIO_EXERCISES.join(', ')}

      Response Format:
      {
          "plan": {
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
                  },
                  {
                      "exercise": "Running (Treadmill)",
                      "frequency": {
                          "duration": "30 minutes"
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
                  },
                  {
                      "exercise": "Cycling (Stationary Bike)",
                      "frequency": {
                          "duration": "30 minutes"
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
                  },
                  {
                      "exercise": "Rowing Machine",
                      "frequency": {
                          "duration": "30 minutes"
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
                  },
                  {
                      "exercise": "Elliptical Trainer",
                      "frequency": {
                          "duration": "30 minutes"
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
                  },
                  {
                      "exercise": "Jump Rope",
                      "frequency": {
                          "duration": "15 minutes"
                      }
                  }
              ]
          }
      }
      Return only the JSON format.`;

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
