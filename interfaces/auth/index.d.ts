export interface ILoginProps {
  username: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  user: IUser;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}
