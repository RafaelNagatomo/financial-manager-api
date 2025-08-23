import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthenticateUserUseCase } from './application/useCases/AutenticateUserUseCase';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthenticateUserUseCase],
})
export class AuthModule {}
