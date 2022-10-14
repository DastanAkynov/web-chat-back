import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base{}

export class UserModel extends TimeStamps  {
  @prop({
    index: true,
    required: true,
  })
  name: string;

  @prop({
    required: true,
    unique: true
  })
  alias: string;

  @prop({
    select: false,
    required: true
  })
  password: string;

  @prop({
    required: false
  })
  description: string;

  @prop({
    default: false
  })
  online: false;
}