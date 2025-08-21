import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../domain/userRepository.interface';
import { User as UserDomainEntity} from '../domain/user.entity';
import { User as UserOrmEntity} from './userOrm.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserOrmEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserOrmEntity);
  }

  async findByEmail(email: string): Promise<UserDomainEntity | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async save(user: UserDomainEntity): Promise<UserDomainEntity> {
    return await this.repository.save(user);
  }

  async create(createUserDto: Partial<UserDomainEntity>): Promise<UserDomainEntity> {
    const user = this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  async getAll(): Promise<UserDomainEntity[]> {
    return await this.repository.find();
  }
}
