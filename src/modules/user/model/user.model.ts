import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// export interface UserModel extends Base{}

export class UserModel extends TimeStamps  {
  @prop({index: true})
  name: string;

  @prop({
    unique: true
  })
  alias: string;

  @prop({
    select: false
  })
  password: string;
}