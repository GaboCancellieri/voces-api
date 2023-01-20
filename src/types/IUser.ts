export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  verifCode?: string;
  isActive: boolean;
  isAdmin: boolean;
}
