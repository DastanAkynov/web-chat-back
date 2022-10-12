import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  alias: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  alias: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
