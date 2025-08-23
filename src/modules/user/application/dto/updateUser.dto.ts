import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  @MinLength(7)
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  password?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
