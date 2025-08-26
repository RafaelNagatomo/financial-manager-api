import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtConfig } from '@config/jwt.config';
import { sign, verify } from 'jsonwebtoken';
import { User } from '@user/domain/user.entity';
import { ITokenService } from '@auth/domain/jwtTokenService.interface';

@Injectable()
export class JwtTokenService implements ITokenService {
  public generateAccessToken(user: User): string {
    const { id, email, superUser, timeZone } = user;

    const payload = {
      email: email,
      superUser: superUser,
      timeZone: timeZone,
    }

    return sign(payload, JwtConfig.accessSecret, {
      subject: id,
      expiresIn: JwtConfig.accessExpiresIn,
    });
  }

  public generateRefreshToken(user: User): string {
    return sign({}, JwtConfig.refreshSecret, {
      subject: user?.id,
      expiresIn: JwtConfig.refreshExpiresIn,
    });
  }

  public validateRefreshToken(token: string): boolean {
    try {
      verify(token, JwtConfig.refreshSecret);
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid token: ${error.message}`);
    }
  }
}
