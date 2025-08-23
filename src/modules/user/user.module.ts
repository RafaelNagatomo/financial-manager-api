import { Module } from '@nestjs/common';
import { UserController } from './presentation/controller/user.controller';
import { CreateUserUseCase } from './application/useCases/createUser.usecase';
import { UserRepository } from './infrastructure/user.repository';
import { UpdateUserUseCase } from './application/useCases/updateUser.usecase';
import { GetUserByIdUseCase } from './application/useCases/getUserById.usecase';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserByIdUseCase,
  ],
  exports: [
    GetUserByIdUseCase,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
