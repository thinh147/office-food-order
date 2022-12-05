import { IAddressItem } from "@core/common/interface";
import { GoogleLoginResponse } from "react-google-login";
import { SortType } from "./config";
import { Channel, OrderStatus, OrderType, VoucherStatus } from "./order";
import { ICartResponse } from "./serverResponse";
import { Gender, IUserAddress } from "./user";
import { PickAndFlatten } from "./utilites";
export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  password: string;
  confirm: string;
  email: string;
  phone: string;
  gender: Gender | number, // female, non;
  dateOfBirth: string;
}

export interface LoginGoogleRequest {
  accessToken: string;
  userGoogleInfo: PickAndFlatten<GoogleLoginResponse, 'profileObj'>;
}

export interface LoginFacebookRequest {
  accessToken: string;
  userId: string;
  email: string;
  name: string;
}

export interface PagingRequest {
  page: number;
  size: number;
  sortType: SortType;
}


export interface IProductRequest extends Partial<PagingRequest> {
  key: string;
  url: string;
  updatedAtFrom: string;
  updatedAtTo: string;
  channel: string[];
  trademark: string[];
  categoryId: number[];
}

export interface IProductCRUDRequest {
  id?: number;
  //product base
  name: string;
  affiliateUrl: string;
  channel: string;
  description: string;
  image: string;
  percentDiscount: number;
  price: number;
  productUrl: string;
  trademark: string;
  categoryId: string;
  metaDataReqs: string;
}

export interface ICartRequest {
  cardId?: number;
  productId?: number;
  quantity?: number;
  price?: number;
  image?: string;
  productName?: string;
  description?: string;
  channelName?: string;
  percentDiscount?: number;
  metaData?: string;
  orderType?: OrderType;
}

export interface IAddressRequest {
  id?: number;
  name: string;
  phone: string;
  address: string;
}

export interface ICreateOrderRequest {
  pointInUsed: number;
  voucherPrice: number;
  addressDto: IUserAddress;
  inputData: ICartResponse;
}

export interface IOrderListRequest extends Partial<PagingRequest> {
  orderStatus: OrderStatus;
  key: string;
  orderDateFrom: string;
  orderDateTo: string;
}

export interface ICreatePaymentRequest {
  paymentImage: string;

  depositPercent: number;

  depositAmount: number;

  paymentInput: ICreatPaymentInputRequest;
}

export interface ICreatPaymentInputRequest {
  orderCode: string;
  orderDate: string;
  dueDate: string;
  totalNetPrice: number;
  totalVat: number;
  finalPrice: number;
  discount: number;
  saleOrderItem: string;
  listCart: string;
}

export interface IFastOrderRequest {
  pointUsed: number;
  voucherPrice: number;
  netPrice: number;
  finalPrice: number;
  vatPrice: number;
  address: IAddressItem;
  items: IFastOrderItem[];
}

export interface IFastOrderItem {
  productUrl: string;
  color: string;
  size: string;
  quantity: number;
  netPrice: number;
  vatPrice: number;
  percentDiscount: number;
  discountPrice: number;
  note: string;
  finalPrice: number;
  yenPrice: number;
  isValidate?: boolean;
  channelName: string;
}


export enum OrderChangeStatusOption {
  confirm = 1,
  changeStatus,
  reject,
  cancel
}
export interface IOrderUpdateStatusRequest {
  orderCode: string;
  updateType: OrderChangeStatusOption;
}

export interface ICreateFastOrderRequest {
  pointUsed: number;
  voucherPrice: number;
  netPrice: number;
  finalPrice: number;
  vatPrice: number;
  address: IUserAddress;
  items: IFastOrderItem[];
}

export interface IVoucherCRUD {
  id?: number;
  title: string;
  code: string;
  quantity: number;
  quantityPerUser: number;
  status: boolean;
  discount: number;
  typeDiscount: number;
  priceDiscountMax: number;
  startDate: string;
  endDate: string;
  orderType: number;
  gender: number;
  channel: Channel;
  userIds: number[];
}

export interface IVoucherRequest extends Partial<PagingRequest> {
  code: string;
  status?: VoucherStatus;
}