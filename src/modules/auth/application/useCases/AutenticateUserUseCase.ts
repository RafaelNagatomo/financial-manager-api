import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "@user/domain/user.entity";
import { LoginDto } from "../dto/login.dto";
import { JwtTokenService } from "@auth/infrastructure/jwtToken.service";
import { BcryptHashService } from "@auth/infrastructure/bcryptHash.service";
import { GetUserByIdUseCase } from "@user/application/useCases/getUserByIdUseCase";
import { UpdateUserUseCase } from "@user/application/useCases/updateUserUseCase";

@Injectable()
export class AuthenticateUserUseCase {
  constructor (
    private readonly hashService: BcryptHashService,
    private readonly tokenService: JwtTokenService,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  public async validadeUser(email: string): Promise<User> {
    const userAlreadyExists = await this.getUserById.execute(email);

    if (!userAlreadyExists) {
      throw new ConflictException('User or password incorrect!');
    };

    return userAlreadyExists;
  }

  public async validadePassword(password: string, user: User): Promise<boolean> {
    const passwordMatch = await this.hashService.compare(password, user.password);

    if (!passwordMatch) {
      throw new ConflictException('User or password incorrect!');
    };

    return passwordMatch
  }

  public async execute(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validadeUser(email);
    const isValidated = await this.validadePassword(password, user);

    if (!isValidated) return;

    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);

    this.updateUser.execute({ ...user, refreshToken });

    return { accessToken, refreshToken }
  }
}
