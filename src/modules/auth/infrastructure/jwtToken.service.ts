import { ITokenService } from '@auth/domain/tokenService.interface';
import { JwtConfig } from '@config/jwt.config';
import { Injectable } from '@nestjs/common';
import { User } from '@user/domain/user.entity';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtTokenService implements ITokenService {
  generateAccessToken(user: User): string {
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

  generateRefreshToken(user: User): string {
    return sign({}, JwtConfig.refreshSecret, {
      subject: user?.id,
      expiresIn: JwtConfig.refreshExpiresIn,
    });
  }
}
