import { IRequestItemCustom } from "@core/common/interface";
import { DEFAULT_CART_REQUEST } from "@core/constant/form";
import { ICartItem, IProductMetaData, OrderType } from "@core/models/order";
import { ICartRequest, ICreatPaymentInputRequest, IFastOrderItem } from "@core/models/serverRequest";
import { IOrderDetailResponse, IProductResponse } from "@core/models/serverResponse";
import moment from "moment";

const percent_prepay = 0.7;

const max_percent_sale_of = 50;

const jyen_vnd_exchange_rate = 178.96;

const tax_rate = 1.2;

const CurrencyWithCommas = (amount: number, postFix = '') => Number(amount) ? `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${postFix}` : amount;
const normalizeNumberForm = (value: any) => +value;
const CountSummaryCart = (
  cart: ICartItem[]
): { jyen: number; vnd: number; prePayJyen: number; prePayVnd: number } => {
  let sumJyen = 0;
  let sumVnd = 0;
  cart.map((ele) => {
    sumJyen += ele.yenPrice * ele.quantity;
    sumVnd += ele.vndPrice * ele.quantity;
  });
  return {
    jyen: Math.ceil(sumJyen),
    vnd: Math.ceil(sumVnd),
    prePayJyen: Math.ceil(sumJyen * percent_prepay),
    prePayVnd: Math.ceil(sumVnd * percent_prepay),
  };
};

const countItemTotalCost = (item: IRequestItemCustom): number => {
  let total = item.quantity * item.price_as_jyen * jyen_vnd_exchange_rate;
  if (item.include_tax) total = total * tax_rate;
  if (item.sale_of > 0) total = (total * item.sale_of) / 100;
  return Math.ceil(total);
};

const countItemsTotalCost = (
  items: IRequestItemCustom[]
): {
  number_product: number;
  total_as_vnd: number;
  total_pre_pay: number;
} => {
  let total = 0;
  let number_product_item = 0;
  items.forEach((item) => {
    total += countItemTotalCost(item);
    number_product_item += item.quantity;
  });
  return {
    number_product: Math.ceil(number_product_item),
    total_as_vnd: Math.ceil(total),
    total_pre_pay: Math.ceil(total * percent_prepay),
  };
};

const normalizeFormNumber = (value: string) => {
  return value ? Number(value) || '' : value;
}

const productToCartRequest = ({ description, imageUrl, price, id, name, channel, percentDiscount }: IProductResponse, metadata: IProductMetaData, quantity: number): ICartRequest => {

  return {
    description,
    price,
    productId: id,
    image: imageUrl,
    quantity,
    productName: name,
    channelName: channel,
    percentDiscount,
    metaData: JSON.stringify([{ ...metadata, quantity }]),
    orderType: OrderType.SALE_ORDER
  }
}

const cartRequestToCartItem = (request: ICartRequest): ICartItem => {
  const { channelName, price, metaData } = request;
  return {
    ...request,
    channel: channelName,
    vndPrice: price,
    yenPrice: price,
    metadataProperty: parseJSON(metaData, [] as IProductMetaData[])
  }
}

const parseJSON = <T>(json: string, defaultValue: T): T => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return defaultValue;
  }
}

const calculateTotalQuantity = (meta: IProductMetaData[]) => meta.reduce((acc, cur) => acc + cur.quantity, 0);

const orderDetailToPaymentInputRequest = (order: IOrderDetailResponse): ICreatPaymentInputRequest => {
  const { finalPrice, itemDetail, code, vatPrice } = order;
  return {
    discount: 0,
    dueDate: moment().add(3, 'days').toISOString(),
    finalPrice,
    listCart: JSON.stringify(itemDetail),
    orderCode: code,
    orderDate: '',
    saleOrderItem: JSON.stringify(itemDetail),
    totalNetPrice: finalPrice - vatPrice,
    totalVat: vatPrice
  } as ICreatPaymentInputRequest
}

const convertDateString = (date: string, format: string) => {
  return moment(date).format(format);
}

const fastOrderToCartItem = (data: IFastOrderItem): ICartRequest => {
  const metadata = JSON.stringify({ configurationName: 'size_color', options: `${data.size}_${data.color}`, quantity: data.quantity } as IProductMetaData)
  return {
    ...DEFAULT_CART_REQUEST,
    ...data,
    channelName: data.channelName,
    price: data.netPrice,
    orderType: OrderType.FAST_ORDER,
    image: data.productUrl,
    description: data.note,
    metaData: metadata
  }
}

export {
  CurrencyWithCommas,
  CountSummaryCart,
  max_percent_sale_of,
  countItemTotalCost,
  countItemsTotalCost,
  normalizeFormNumber,
  productToCartRequest,
  parseJSON,
  calculateTotalQuantity,
  cartRequestToCartItem,
  orderDetailToPaymentInputRequest,
  convertDateString,
  normalizeNumberForm,
  fastOrderToCartItem
};

