import { SuspenseProps } from "react";
import { IconType } from "react-icons/lib";
import { RouteProps } from "react-router-dom";
import { Channel, ICartInfo, ICartItem, ICategory, IPropertySetting } from "./order";
import { ICartRequest } from "./serverRequest";
import { IUser } from "./user";

export interface RouterConfig extends RouteProps {
  guard?: (props: RouterConfig) => boolean;
  fallback?: () => JSX.Element;
  component?: React.LazyExoticComponent<() => JSX.Element>;
  children?: RouterConfig[];
  key: string;
  name?: string;
  Icon?: IconType;
}
export interface IStateAuthContext {
  user: IUser;
  token: string;
  refreshToken: string;
}

interface IContext {
  loading: boolean;
  setLoading: (state: boolean) => void;
}
export interface IAuthContext extends Partial<IContext> {
  auth: IStateAuthContext,
  setAuth: (state: IStateAuthContext) => void,
  logout: () => void
}

export interface ICartContext extends IContext {
  carts: ICartItem[];
  cartInfo: ICartInfo;
  addToCart: (cart: ICartRequest) => void,
  deleteCart: (cartId: number) => void,
  updateCart: (cartId: ICartRequest) => void
}

export interface ICategoriesContext extends Partial<IContext> {
  categories: ICategory[],
  getMainCategories: () => ICategory[],
  getSubCategories: (mainId: number) => ICategory[],
  getAllSubByChannelCategories: (channel: string) => ICategory[],
}

export enum SortType {
  id,
  priceDes,
  priceAsc,
  createdAtAsc,
  createdAtDes,
}

export interface ModalProps<T, R = T> {
  handleOk: (data: R) => void;
  handleCancel: () => void;
  data: T | null
}


export interface IPropertyContext extends Partial<IContext> {
  property: IPropertySetting,
  advertisement: IAdvertisementSetting,
  saveProperty: (property: IPropertySetting) => void
  setAdvertisement: (settings: IAdvertisementSetting) => void
}

export interface IAdvertisementSetting {
  id: number;
  section1: string[];
  section2: string[];
  section3: string[];
}