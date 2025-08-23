import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from '../application/useCases/createUser.usecase';
import { User as UserDomainEntity } from '../domain/user.entity';
import { CreateUserDto } from '../application/dto/createUser.dto';
import { JwtAuthGuard } from '@guards/jwtAuthGuard';

@Controller('user')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async gettAll(@Req() req): Promise<UserDomainEntity[]> {
    console.log("req: ", req.user)
    return await this.createUser.gettAll();
  }

  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<Partial<UserDomainEntity>> {
    return await this.createUser.execute(createUserDto);
  }
}
