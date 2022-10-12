import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { IAuthData } from './types/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: RegisterDto): Promise<IAuthData> {
    return this.authService.register(data);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() data: LoginDto): Promise<IAuthData>  {
    return this.authService.login(data);
  }
}
