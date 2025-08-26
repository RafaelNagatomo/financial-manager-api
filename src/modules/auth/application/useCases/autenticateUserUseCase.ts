import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "@user/domain/user.entity";
import { LoginDto } from "../dto/login.dto";
import { tokensResponseDto } from "@auth/application/dto/tokensResponse.dto";
import { JwtTokenService } from "@auth/infrastructure/jwtToken.service";
import { BcryptHashService } from "@auth/infrastructure/bcryptHash.service";
import { GetUserByEmailUseCase } from "@user/application/useCases/getUserByEmail.usecase";
import { UpdateUserUseCase } from "@user/application/useCases/updateUser.usecase";

@Injectable()
export class AuthenticateUserUseCase {
  constructor (
    private readonly hashService: BcryptHashService,
    private readonly tokenService: JwtTokenService,
    private readonly getUserByEmail: GetUserByEmailUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  public async validadeUser(email: string): Promise<User> {
    const userExists = await this.getUserByEmail.execute(email);

    if (!userExists) {
      throw new ConflictException('User or password incorrect!');
    };

    return userExists;
  }

  public async validadePassword(password: string, user: User): Promise<void> {
    const passwordMatch = await this.hashService.compare(password, user.password);

    if (!passwordMatch) {
      throw new ConflictException('User or password incorrect!');
    };
  }

  public async execute(loginDto: LoginDto): Promise<tokensResponseDto> {
    const { email, password } = loginDto;
    const userExists = await this.validadeUser(email);
    await this.validadePassword(password, userExists);

    const accessToken = this.tokenService.generateAccessToken(userExists);
    const refreshToken = this.tokenService.generateRefreshToken(userExists);

    this.updateUser.execute({ ...userExists, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}
