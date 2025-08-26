import { JwtConfig } from '@config/jwt.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConfig.accessSecret,
    });
  }

  validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return {
      userId: payload.sub, 
      mail: payload.email,
      superUser: payload.superUser,
      timeZone: payload.timeZone,
    };
  }
}
