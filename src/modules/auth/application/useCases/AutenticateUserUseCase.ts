import { ConflictException, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserRepository } from "@user/infrastructure/user.repository";
import { User } from "@user/domain/user.entity";
import { LoginDto } from "../dto/login.dto";
import { JwtTokenService } from "@auth/infrastructure/jwtToken.service";
import { BcryptHashService } from "@auth/infrastructure/bcryptHash.service";

@Injectable()
export class AuthenticateUserUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly hashService: BcryptHashService,
    private readonly tokenService: JwtTokenService,
  ) {}

  public async validadeUser(email: string): Promise<User> {
    const userAlreadyExists = await this.userRepository.getByEmail(email);

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

    // save refreshToken by updateUser

    return { accessToken, refreshToken }
  }
}
