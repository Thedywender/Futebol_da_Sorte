import { Identifiable } from './UserTypes';

export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends Identifiable, ILogin {
  username: string
  role: string
}

export type UserType = Identifiable & ILogin & [
    name: string,
];

export type IUserResponse = Omit<IUser, 'password'>;
