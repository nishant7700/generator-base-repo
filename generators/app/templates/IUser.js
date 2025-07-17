export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  refreshToken?: string; // Optional field to store refresh token
}
