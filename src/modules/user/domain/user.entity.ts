export class User {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  timeZone: string;
  superUser: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken?: string;
}
