import { Types } from 'mongoose';

export enum UserRoles {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  MEMBER = 'member',
}

export enum UserStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export interface IJwtToken {
  id: Types.ObjectId;
  email: string;
  userRole: UserRoles;
}
