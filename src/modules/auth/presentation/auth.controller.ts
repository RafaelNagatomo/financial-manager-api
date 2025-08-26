import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '@auth/application/dto/login.dto';
import { RefreshTokenDto } from '@auth/application/dto/refreshToken.dto';
import { tokensResponseDto } from '@auth/application/dto/tokensResponse.dto';
import { AuthenticateUserUseCase } from '@auth/application/useCases/autenticateUserUseCase';
import { RefreshAccessTokenUseCase } from '@auth/application/useCases/refreshAccessTokenUseCase';

@Controller('auth')
export class AuthController {
  constructor(
    private authUser: AuthenticateUserUseCase,
    private refreshAccess: RefreshAccessTokenUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<tokensResponseDto> {
    return await this.authUser.execute(loginDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshTokenDto): Promise<tokensResponseDto> {
    return this.refreshAccess.execute(refreshDto);
  }
}
