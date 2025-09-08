import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserRepository } from '../../infrastructure/user.repository';
import { User as UserDomainEntity } from '../../domain/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async validadeEmail(email: string): Promise<void> {
    const emailAlreadyExists = await this.userRepository.getByEmail(email);

    if (emailAlreadyExists) {
      throw new BadRequestException('User already exists');
    };
  }

  public async generatePasswordHash(password: string): Promise<string> {
    return await hash(password, 10);
  }

  public async execute(createUserDto: CreateUserDto): Promise<UserDomainEntity> {
    const { email, password } = createUserDto;

    await this.validadeEmail(email);
    createUserDto.password = await this.generatePasswordHash(password);
    
    return await this.userRepository.create(createUserDto);;
  }

  public async getAll(): Promise<UserDomainEntity[]> {
    return await this.userRepository.getAll();
  }
}
