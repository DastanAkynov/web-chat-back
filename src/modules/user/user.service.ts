import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import {hash} from 'bcrypt'
import { IUserData } from './types/user.interface';
import { UserModel } from './model/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ExpressRequest } from 'src/utils/types/interfaces';

@Injectable()
export class UserService {
  constructor(
     @InjectModel(UserModel) private userModel: ModelType<UserModel>
  ){}

  async create(data: CreateUserDto) {
    const existedUser = await this.userModel.findOne({alias: data.alias}).exec()
    if(existedUser) throw new ConflictException('Пользователь с таким никнеймом уже существует')

    const user = new this.userModel()
    user.name = data.name
    user.alias = data.alias
    user.password = await hash(data.password, 10)
    await user.save()
    const userData = this.createUserData(user)

    return userData;
  }

  async validUser(data: CreateUserDto) {
    const user =  await this.userModel.findOne()
    return user;
  }

  async getChatUserList(req: ExpressRequest) {
    const userList = await this.userModel.find()
    const chatUsers = userList.filter(el => el.id !== req.user.id)
    return {userList: chatUsers}
  }

  createUserData(user): IUserData {
    return {
      _id: user._id,
      name: user.name,
      alias: user.alias
    }
  }
}
