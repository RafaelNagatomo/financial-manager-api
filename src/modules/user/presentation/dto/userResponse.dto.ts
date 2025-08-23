import { User } from "@user/domain/user.entity";

export class UserResponseDto {
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

  private constructor(user: User) {
    this.id = user.id;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.lastLoginAt = user.lastLoginAt;
    this.timeZone = user.timeZone;
    this.superUser = user.superUser;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }

  static serializer(user: User): UserResponseDto;
  static serializer(users: User[]): UserResponseDto[];
  static serializer(userOrUsers: User | User[]): UserResponseDto | UserResponseDto[] {
    if (Array.isArray(userOrUsers)) {
      return userOrUsers.map((u) => new UserResponseDto(u));
    }
    return new UserResponseDto(userOrUsers);
  }
}
