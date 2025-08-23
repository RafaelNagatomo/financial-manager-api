import { ConflictException, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserRepository } from "@user/infrastructure/user.repository";
import { User } from "@user/domain/user.entity";
import { LoginDto } from "../dto/login.dto";
import { JwtConfig } from "@config/jwt.config";

@Injectable()
export class AuthenticateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public async validadeUser(email: string): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new ConflictException('User or password incorrect!');
    };

    return userAlreadyExists;
  }

  public async validadePassword(password: string, user: User): Promise<boolean> {
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new ConflictException('User or password incorrect!');
    };

    return passwordMatch
  }

  public tokenGenerator(user: User): string {
    const { id, email, superUser, timeZone } = user;

    const payload = {
      email: email,
      superUser: superUser,
      timeZone: timeZone,
    }

    const token = sign(payload, JwtConfig.secret, {
      subject: id,
      expiresIn: JwtConfig.expiresIn,
    });

    return token;
  }

  public async execute(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validadeUser(email);
    const isValidated = await this.validadePassword(password, user);

    if (!isValidated) return;

    const token = this.tokenGenerator(user);
    return { token }
  }
}
