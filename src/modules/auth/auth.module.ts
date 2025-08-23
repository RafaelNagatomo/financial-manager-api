import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './presentation/auth.controller';
import { AuthenticateUserUseCase } from './application/useCases/AutenticateUserUseCase';
import { UserModule } from '@user/user.module';
import { JwtStrategy } from '@strategies/jwtStrategy';
import { BcryptHashService } from './infrastructure/bcryptHash.service';
import { JwtTokenService } from './infrastructure/jwtToken.service';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthenticateUserUseCase,
    JwtStrategy,
    BcryptHashService,
    JwtTokenService,
  ],
})
export class AuthModule {}
