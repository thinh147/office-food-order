export interface IUser {
  email: string;
  name: string;
  phone: string;
  point: number;
  role: Role;
  gender: Gender;
}

export interface IUserInfo {
  email: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
}

export enum Gender {
  male = '1',
  female = '2',
  none = '0',
  other = '3'
}

export enum Role {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  SHIPPER = "SHIPPER"
}

export type GenderType = keyof typeof Gender;

export interface IUserAddress {
  addressId: number;
  address: string;
  phone: string;
  name: string;
}