import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './presentation/auth.controller';
import { AuthenticateUserUseCase } from './application/useCases/autenticateUserUseCase';
import { UserModule } from '@user/user.module';
import { JwtStrategy } from 'src/shared/strategies/jwtStrategy';
import { BcryptHashService } from './infrastructure/bcryptHash.service';
import { JwtTokenService } from './infrastructure/jwtToken.service';
import { RefreshAccessTokenUseCase } from './application/useCases/refreshAccessTokenUseCase';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    BcryptHashService,
    JwtTokenService,
    JwtStrategy,
    AuthenticateUserUseCase,
    RefreshAccessTokenUseCase,
  ],
})
export class AuthModule {}
