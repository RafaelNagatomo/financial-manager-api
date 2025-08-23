import { User } from "@user/domain/user.entity";

export interface ITokenService {
  generateAccessToken(user: User): string;
  generateRefreshToken(user: User): string;
}
