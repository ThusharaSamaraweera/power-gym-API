// export interface BodyInfo {
//   height: number;
//   weight: number;
//   fat: number;
//   muscleMass?: number;
// }

// export interface HealthInfo {
//   bloodPressure: string;
//   heartRate: number;
// }

export enum PACKAGE_TYPE {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ELITE = 'ELITE',
}

// export enum PACKAGE_DURATION {
//   THREE_MONTHS = 'THREE_MONTHS',
//   SIX_MONTHS = 'SIX_MONTHS',
//   ANNUAL = 'ANNUAL',
// }

export enum BODY_HEALTH_INFO_RECORD_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class ProgressRecord {
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
    maximumWeightLifted: number;
    reps: number;
    oneRepMax: number;
  };
}
