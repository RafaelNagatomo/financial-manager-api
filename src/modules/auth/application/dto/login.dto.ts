import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(7)
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  password: string;
}
