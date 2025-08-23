import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../domain/userRepository.interface';
import { User as UserDomainEntity} from '../domain/user.entity';
import { User as UserOrmEntity} from './userOrm.entity';
import { CreateUserDto } from '@user/application/dto/createUser.dto';
import { UpdateUserDto } from '@user/application/dto/updateUser.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserOrmEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserOrmEntity);
  }
  
  async getAll(): Promise<UserDomainEntity[]> {
    return await this.repository.find();
  }

  async getByEmail(email: string): Promise<UserDomainEntity | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async getById(id: string): Promise<UserDomainEntity | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async save(user: UserDomainEntity): Promise<UserDomainEntity> {
    return await this.repository.save(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDomainEntity> {
    const user = this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserDomainEntity | null> {
    await this.repository.save(updateUserDto);
    return await this.getById(updateUserDto?.id); 
  }
}
