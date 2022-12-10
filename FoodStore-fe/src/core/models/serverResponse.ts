import { Channel, ICartItem, IProductMetaData, OrderStatus, OrderType } from "./order";
import { PaymentStatus } from "./payment";
import { Gender, Role } from "./user";

export interface ServerResponse<T> {
  data: T;
  code: number;
  message: string;
  error?: string;
}

export interface Pagination<T> {
  elements: T[];
  totalElements: number;
}

export interface IAuthResponse {
  accessToken: string;
  cartCount: number;
  email: string;
  gender: Gender;
  name: string;
  phone: string;
  point: number;
  role: Role;
  tokenType: string;
}



export interface IMainCategoryResponse {
  id: number;
  title: string;
  channel: string;
}

export interface ISubCategoryResponse {
  id: number;
  name: string;
}

export interface IProductResponse {
  id: number;
  name: string;
  productUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  percentDiscount: number;
  channel: Channel;
  subCategoryId: number;
  subCategoryName: string;
  trademark: number;
  updatedAt: string;
  metaData: string;
  price: number;
  description: string;
  quantity: number;
  metadataProperty: IProductMetaData[];
}

export type IProductDetail = IProductResponse;

export interface ICartResponse {
  items: ICartItem[],
  totalItem: number,
  totalPriceYen: number,
  totalPriceVnd: number
}

export interface ICreateOrderResponse {
  orderCode: string;
  orderDate: string;
  dueDate: string;
  totalNetPrice: number;
  totalVat: number;
  finalPrice: number;
  discount: number;
  saleOrderItem: string;
}

export interface IUploadFileResponse {
  bucket: string;
  key: string;
  name: string;
  mime: string;
  hash: string;
  etag: string;
  size: number;
  extension: string;
  url: string;
  publicAccess: boolean;
}

export interface IOrderDetailResponse extends IOrderResponse {
  address: string;
  addressId: 11
  code: string;
  depositPercent: number
  depositPrice: number;
  discountPrice: number
  dueDate: string;
  finalPrice: number;
  itemDetail: Pagination<IOrderDetailItemResponse>;
  netPrice: number;
  remainingPrice: number;
  status: OrderStatus
  vatPrice: number;
  userEmail: string;
  userId: number
  userPhone: string;
}

export interface IOrderDetailItemResponse {
  channel: Channel
  completedDate: string;
  config: string;
  discount: number;
  id: number;
  itemFinalPrice: number;
  option: string;
  orderDate: string;
  orderType: OrderType
  paymentImage: string;
  paymentStatus: PaymentStatus
  productId: number
  productImage: string;
  productName: string;
  quantity: number
  saleOrderCode: string;
  status: OrderStatus
  updatedAt: string;
  userEmail: string;
  userId: number
  userPhone: string;
}

export interface IOrderResponse {
  code: string;
  customerEmail: string;
  customerName: string;
  customerPhone: number;
  depositPrice: number;
  id: number;
  orderDate: Date;
  status: OrderStatus;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  paymentDate: string;
  updatedAt: string;
}

export interface IVoucherResponse {
  id: number;
  title: string;
  code: string;
  quantity: number;
  quantityPerUser: number;
  discount: number;
  discountType: 0 | 1;
  priceDiscountMax: number;
  startDate: string;
  endDate: string;
  orderType: number;
  gender: number;
  channel: Channel;
  minValueToUse: number;
  maxPriceDiscount: number;
  createdDate: string;
  dueDate: string;
  productId: number;
  userId: number;
  users: any[];
  userEmail: string;
  isActive: 0 | 1;
}