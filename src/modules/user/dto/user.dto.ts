import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
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

export class UpdateUserDto {}
