import {Request} from 'express'
import { UserModel } from 'src/modules/user/model/user.model'

export interface ExpressRequest extends Request {
  user: UserModel
}
