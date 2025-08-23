import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/user.repository';
import { User as UserDomainEntity } from '../../domain/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(email: string): Promise<UserDomainEntity | null> {
    return await this.userRepository.getByEmail(email);
  }
}
