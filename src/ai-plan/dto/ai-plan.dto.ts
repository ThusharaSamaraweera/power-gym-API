export class Frequency {
  sets?: number;
  reps?: number;
  duration?: string;
}

export class Exercise {
  exercise: string;
  frequency: Frequency;
}

export class DayPlan {
  isRest: boolean;
  exercises: Exercise[];
}

export class WorkoutPlanDto {
  duration: string; // e.g., "50 days"
  plan: {
    [day: string]: DayPlan; // e.g., "Monday", "Tuesday", etc.
  };
}
