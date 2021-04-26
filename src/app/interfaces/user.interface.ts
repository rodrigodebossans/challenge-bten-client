export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  homeTeam?: string;
  age?: number;
  height?: number;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}