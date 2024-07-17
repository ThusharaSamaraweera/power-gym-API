import { ApiProperty } from '@nestjs/swagger';

// export class BodyInfoDto {
//   @ApiProperty({
//     type: Number,
//     required: true,
//   })
//   height: number;

//   @ApiProperty({
//     type: Number,
//     required: true,
//   })
//   weight: number;

//   @ApiProperty({
//     type: Number,
//     required: true,
//     description: 'Body fat percentage',
//   })
//   fat: number;

//   @ApiProperty({
//     type: Number,
//     required: false,
//   })
//   muscleMass?: number;
// }

// export class HealthInfoDto {
//   @ApiProperty({
//     type: Number,
//     required: false,
//   })
//   bloodPressure: string;

//   @ApiProperty({
//     type: Number,
//     required: false,
//   })
//   heartRate: number;
// }

export class BodyHealthInfoDto {
  anthropometricMeasurements: {
    weight: number;
    height: number;
    waistCircumference: number;
    hipCircumference: number;
    chestCircumference: number;
    armCircumference: number;
    thighCircumference: number;
    abdomenCircumference: number;
    tricepsCircumference: number;
    supraIliacCircumference: number;
    waistToHipRatio: number;
  };
  bodyComposition: {
    bodyMassIndex: number;
    bodyDensity: number;
    bodyFatPercentage: number;
  };
  cardiovascularFitness: {
    restingHeartRate: number;
    estimatedMaximumHeartRate: number;
    maximumWeightLifted: number;
    reps: number;
    oneRepMax: number;
  };
  flexibility: {
    sitAndReach: number;
  };
  endurance: {
    muscularEndurance: number;
    cardiorespiratoryEndurance: number;
  };
  goalsAndPreferences: {
    fitnessGoals: string[];
    exercisePreferences: string[];
  };
  healthConditions: {
    medicalHistory: string[];
  };
  lifestyle: {
    activityLevel: string;
    sleepDuration: string;
    // stressLevel: string;
    // sleepQuality: string;
    // nutrition: string;
    // hydration: string;
    // alcohol: string;
    // smoking: string;
  };
}
