import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@user/domain/user.entity";
import { RefreshTokenDto } from "../dto/refreshToken.dto";
import { tokensResponseDto } from "@auth/application/dto/tokensResponse.dto";
import { JwtTokenService } from "@auth/infrastructure/jwtToken.service";
import { GetUserByIdUseCase } from "@user/application/useCases/getUserById.usecase";
import { UpdateUserUseCase } from "@user/application/useCases/updateUser.usecase";

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor (
    private readonly tokenService: JwtTokenService,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  public async validateUserRefreshToken(refreshToken: string, id: string): Promise<User> {
    const userExists = await this.getUserById.execute(id);

    if (!userExists || userExists?.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    return userExists;
  }

  public async execute(refreshDto: RefreshTokenDto): Promise<tokensResponseDto> {
    const { userId, refreshToken } = refreshDto;
    const userExists = await this.validateUserRefreshToken(refreshToken, userId);
    this.tokenService.validateRefreshToken(refreshToken);

    const newAccessToken = this.tokenService.generateAccessToken(userExists);
    const newRefreshToken = this.tokenService.generateRefreshToken(userExists);

    this.updateUser.execute({ id: userId, refreshToken: newRefreshToken });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
