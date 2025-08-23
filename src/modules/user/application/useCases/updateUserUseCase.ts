import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/user.repository';
import { User as UserDomainEntity } from '../../domain/user.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async validadeUser(id: string): Promise<UserDomainEntity> {
    const userAlreadyExists = await this.userRepository.getById(id);

    if (!userAlreadyExists) {
      throw new ConflictException('User not found!');
    };

    return userAlreadyExists;
  }

  public async execute(updateUserDto: UpdateUserDto): Promise<Partial<UserDomainEntity>> {
    const { id } = updateUserDto;

    const validatedUser = await this.validadeUser(id);
    Object.assign(validatedUser, updateUserDto);
    const updatedUser = await this.userRepository.update(validatedUser);

    if (!updatedUser) {
      throw new ConflictException('User not found!');
    };
    const { password, refreshToken, ...filteredUser } = updatedUser;

    return filteredUser;
  }
}
