import { IOrderUpdateStatusRequest } from "./serverRequest";
import { ICartResponse, Pagination } from "./serverResponse";

export interface IProduct {
  id: number;
  name: string;
  price: string;
}

export interface ICategory {
  id: number;
  name: string;
  channel: string;
  title: string;
  children: ICategory[];
  isLoad: boolean;
  parentId: number;
}

export interface IProductMetaData {
  configurationName: string;
  options: string;
  quantity: number;
}

export enum Channel {
  amazon = 'amazon',
  mercari = 'mercari'
}

export interface IPropertySetting {
  id: number;
  vatPercent: number;
  shipFee: number;
  exchangeRate: number;
}

export interface ICartInfo extends Omit<ICartResponse, 'items'> {
  totalItemIncludeQuantity: number;
}

export interface ICartItem {
  cartId: number;
  image: string;
  productName: string;
  description: string;
  yenPrice: number;
  vndPrice: number;
  quantity: number;
  productId: number;
  channel: string;
  percentDiscount: number;
  metaData: string;
  metadataProperty: IProductMetaData[];
  orderType: OrderType
}

export enum SuggestPropertyProduct {
  branch = 'branch',
  status = 'status',
  origin = 'origin',
  size_color = 'size_color'
}

export enum OrderStatus {
  ALL = -1,
  PENDING = 1,
  BUYING,
  BUYING_COMPLETED,
  DELIVERING_VN,
  DELIVERING,
  DELIVERED,
  COMPLETED,
  CANCELED
}

export enum OrderType {
  SALE_ORDER = 1, FAST_ORDER = 2, GROSS_ORDER = 3, DETACH_ORDER
}

export type IOrderFormCRUD = IOrderUpdateStatusRequest;

export interface IFastOrderDetail {
  finalPrice: number;
  vatPrice: number;
  discountPrice: number;
  netPrice: number;
  depositPercent: number;
  depositPrice: number;
  remainingPrice: number;
  dueDate: string;
  createdAt: string;
  code: string;
  address: string;
  addressId: number;
  status: OrderStatus;
  itemDetail: Pagination<IFastOrderItem>;
}

export interface IFastOrderItem {
  id: number;
  completedDate: string;
  userEmail: string;
  userId: number;
  userPhone: string;
  userName: string;
  discount: number;
  itemFinalPrice: number;
  orderDate: string;
  status: OrderStatus;
  updatedAt: string;
  fastOrderCode: string;
  quantity: number;
  paymentStatus: number;
  percentDiscount: number;
  paymentImage: string;
  orderType: OrderType;
  color: string;
  size: string;
  productUrl: string;
  totalNetPrice: number;
  totalVATPrice: number;
  note: string;
  depositAmount: number;
  depositPercent: number;
}

export enum VoucherStatus {
  inactive, active = 1
}

export interface IVoucher {
  id: number;
  code: string;
  discount: number;
  minValueToUse: number;
  maxPriceDiscount: number;
  createdDate: string;
  startDate: string;
  dueDate: string;
  productId: number;
  userId: string;
  userEmail: string;
  quantity: number;
  isActive: VoucherStatus;
  channel: string;
  discountType: number;
}