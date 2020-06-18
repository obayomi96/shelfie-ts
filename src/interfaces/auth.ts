import { IUser } from './user'

export interface IAuth {
  token: any
  user?: IUser
}