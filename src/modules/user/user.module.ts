import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { CreateUserUseCase } from './application/useCases/createUser.usecase';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
