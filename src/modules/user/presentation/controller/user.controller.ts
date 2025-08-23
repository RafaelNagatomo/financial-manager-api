import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwtAuthGuard';
import { UserResponseDto } from '../dto/userResponse.dto';
import { UpdateUserDto } from '@user/application/dto/updateUser.dto';
import { UpdateUserUseCase } from '@user/application/useCases/updateUserUseCase';
import { CreateUserUseCase } from '@user/application/useCases/createUser.usecase';
import { CreateUserDto } from '@user/application/dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/')
  public async getAll(@Req() req): Promise<UserResponseDto[]> {
    console.log("req: ", req.user)
    const users = await this.createUser.getAll();
    return UserResponseDto.serializer(users);
  }

  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUser.execute(createUserDto);
    return UserResponseDto.serializer(user);
  }

  @Put('update')
  public async update(@Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.updateUser.execute(updateUserDto);
    return UserResponseDto.serializer(user);
  }
}
