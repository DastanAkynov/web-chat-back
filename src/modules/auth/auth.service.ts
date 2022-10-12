import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { compare } from 'bcrypt'
import { IAuthData } from './types/auth.interfaces';
import { UserModel } from '../user/model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private userModel: ModelType<UserModel>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(data: RegisterDto): Promise<IAuthData>  {
    const existed = await this.userModel.findOne({alias: data.alias}).exec()
    if(existed) {
      throw new ConflictException('Пользователь с таким никнеймом уже существует')
    }
    const user = await this.userService.create(data)
    const token = this.generateToken(user._id)
    return {user, token};
  }


  async login(data: LoginDto): Promise<IAuthData>  {

    const user = await this.userModel.findOne({alias: data.alias}).populate("password").exec()
    if(!user) throw new NotFoundException('Пользователь не найден')

    const validPassword = await compare(data.password, user.password);
    if(!validPassword) throw new NotFoundException('Пользователь не найден')

    const userData = this.userService.createUserData(user)
    const token = this.generateToken(user._id)
    return {user: userData, token };
  }


  generateToken(id: string): string {
    return this.jwtService.sign({ id })
  }


  async validateToken(token: string): Promise<UserModel | null> {
    try {
      const payload = await this.jwtService
      .verify(token)
      // console.log(payload)
      return payload
    return 
    } catch (err) {
      return null
    }
  }
}
