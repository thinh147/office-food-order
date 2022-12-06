import { SortType } from "@core/models/config";
import { Channel, OrderType, VoucherStatus } from "@core/models/order";
import { ICartRequest, IFastOrderItem, IVoucherRequest } from "@core/models/serverRequest";
import { Gender } from "@core/models/user";

export const GENDER = [
  { value: Gender.male, label: 'Nam' },
  { value: Gender.female, label: 'Nữ' },
  { value: Gender.none, label: 'Không có' },
  { value: Gender.other, label: 'Khác' },
]

export const MAP_GENDER_TO_NUMBER = {
  [Gender.male]: 1,
  [Gender.female]: 2,
  [Gender.none]: 0,
  [Gender.other]: 3
}

export const CHANNEL_FORM = [
  { value: Channel.amazon, label: 'Amazon' },
  { value: Channel.mercari, label: 'Mercari' },
]

export const FAST_ORDER_ITEM_DEFAULT: IFastOrderItem = {
  color: '',
  discountPrice: 0,
  finalPrice: 0,
  netPrice: 0,
  note: '',
  percentDiscount: 0,
  productUrl: '',
  quantity: 0,
  size: '',
  vatPrice: 0,
  yenPrice: 0,
  channelName: ''
}

export const DEFAULT_CART_REQUEST: ICartRequest = {
  channelName: '',
  description: '',
  image: '',
  metaData: '',
  orderType: OrderType.SALE_ORDER,
  percentDiscount: 0,
  price: 0,
  productId: 0,
  productName: '',
  quantity: 0
}

export const CHANNEL_DROPDOWN = [
  {
    value: Channel.amazon, label: 'Amazon'
  },
  {
    value: Channel.mercari, label: 'Mercari'
  }
]

export const DEFAULT_VOUCHER_REQUEST: IVoucherRequest = {
  code: '',
  page: 0,
  size: 20,
}

