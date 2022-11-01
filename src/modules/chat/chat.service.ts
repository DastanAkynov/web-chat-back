import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '../user/model/user.model';

@Injectable()
export class ChatService {
  constructor( 
    @InjectModel(UserModel) private userModel: ModelType<UserModel>
  ) {}  
}