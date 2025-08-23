import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwtAuthGuard';
import { User as UserDomainEntity } from '../domain/user.entity';
import { CreateUserDto } from '../application/dto/createUser.dto';
import { UpdateUserDto } from '@user/application/dto/updateUser.dto';
import { CreateUserUseCase } from '../application/useCases/createUser.usecase';
import { UpdateUserUseCase } from '@user/application/useCases/updateUserUseCase';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/')
  public async gettAll(@Req() req): Promise<UserDomainEntity[]> {
    console.log("req: ", req.user)
    return await this.createUser.gettAll();
  }

  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<Partial<UserDomainEntity>> {
    return await this.createUser.execute(createUserDto);
  }

  @Put('update')
  public async update(@Body() updateUserDto: UpdateUserDto): Promise<Partial<UserDomainEntity>> {
    return await this.updateUser.execute(updateUserDto);
  }
}
