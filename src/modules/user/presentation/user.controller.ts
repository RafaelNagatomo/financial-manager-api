import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/useCases/createUser.usecase';
import { User as UserDomainEntity } from '../domain/user.entity';
import { CreateUserDto } from '../application/dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Get('/')
  public async gettAll(): Promise<UserDomainEntity[]> {
    return await this.createUser.gettAll();
  }

  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<Partial<UserDomainEntity>> {
    return await this.createUser.execute(createUserDto);
  }
}
