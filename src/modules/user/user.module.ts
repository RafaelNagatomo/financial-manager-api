import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { CreateUserUseCase } from './application/useCases/createUser.usecase';
import { UserRepository } from './infrastructure/user.repository';
import { UpdateUserUseCase } from './application/useCases/updateUserUseCase';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
  ],
  exports: [
    UserRepository,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
