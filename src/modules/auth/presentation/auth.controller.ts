import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from '../application/useCases/autenticateUserUseCase';
import { LoginDto } from '@auth/application/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authUser: AuthenticateUserUseCase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authUser.execute(loginDto);
  }
}
