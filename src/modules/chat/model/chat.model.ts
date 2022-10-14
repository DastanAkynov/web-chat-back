import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UserModel } from 'src/modules/user/model/user.model';

export class ChatModel extends TimeStamps  {
  @prop({index: true})
  text: string;

  @prop({
     ref: () => UserModel 
  })
  user: string;
}