import { User } from './user.entity';
import { CreateUserDto } from '@user/application/dto/createUser.dto';
import { UpdateUserDto } from '@user/application/dto/updateUser.dto';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserDto: UpdateUserDto): Promise<User | null>;
}
