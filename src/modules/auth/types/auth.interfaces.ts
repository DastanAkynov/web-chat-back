import { IUserData } from 'src/modules/user/types/user.interface';

export interface IAuthData {
  user: IUserData,
  token: string
}