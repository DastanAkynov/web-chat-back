import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  register(data: RegisterDto) {
    return 'Register';
  }

  login(data: RegisterDto) {
    return `Login`;
  }
}
