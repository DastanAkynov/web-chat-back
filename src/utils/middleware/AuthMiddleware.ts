import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserModel } from 'src/modules/user/model/user.model';import { ExpressRequest } from 'src/utils/types/interfaces';


@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly authService: AuthService){}
  
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    const user = await this.authService.getUserByJwt(token)
    if(!token && !user) throw new UnauthorizedException('You are unauthorized!')
    req.user = user
    
    next();
  }
}
