import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './presentation/auth.controller';
import { AuthenticateUserUseCase } from './application/useCases/AutenticateUserUseCase';
import { UserModule } from '@user/user.module';
import { JwtStrategy } from '@strategies/jwtStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticateUserUseCase, JwtStrategy],
})
export class AuthModule {}
