import { JwtModuleOptions } from '@nestjs/jwt';

export const config = {
  API: 8000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'SECRET_KEY'
}

export const jwtConfig: JwtModuleOptions = {
  secret: config.JWT_SECRET_KEY,
  signOptions: { expiresIn: '100d' }
};