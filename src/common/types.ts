import { Types } from 'mongoose';

export enum UserRoles {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  MEMBER = 'MEMBER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

export interface IJwtToken {
  id: string;
  email: string;
  userRole: UserRoles;
}
