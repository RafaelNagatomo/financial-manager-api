import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { CreateUserUseCase } from './application/useCases/createUser.usecase';
import { UserRepository } from './infrastructure/user.repository';
import { UpdateUserUseCase } from './application/useCases/updateUser.usecase';
import { GetUserByEmailUseCase } from './application/useCases/getUserByEmail.usecase';
import { GetUserByIdUseCase } from './application/useCases/getUserById.usecase';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
  ],
  exports: [
    UpdateUserUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
  ],
})
export class UserModule {}
