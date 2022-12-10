import { STATUS_CODE } from "@core/constant/setting";
import { filterObjectValue } from "@core/helpers/utils";
import { ICartInfo, IFastOrderDetail, IPropertySetting, OrderStatus, OrderType } from "@core/models/order";
import { ICreateFastOrderRequest, ICreateOrderRequest, IOrderListRequest, IOrderUpdateStatusRequest } from "@core/models/serverRequest";
import { ICreateOrderResponse, IOrderDetailResponse, IOrderResponse, Pagination } from "@core/models/serverResponse";
import { message } from "antd";
import { get, post } from "./api";

const calculateOrder = (cartInfo: ICartInfo, property: IPropertySetting, depositPercent: number, voucher: any) => {
  const discount = 0;
  const deposit = cartInfo.totalPriceVnd * (depositPercent / 100);
  const finalPriceVnd = cartInfo.totalPriceVnd;
  const finalPriceYen = cartInfo.totalPriceYen;
  return {
    deposit,
    discount,
    finalPriceVnd,
    finalPriceYen
  }
}

const createOrder = async (param: ICreateOrderRequest) => {
  const response = await post<ICreateOrderResponse>('order/create', param);
  const { code } = response;
  if (code !== STATUS_CODE.SUCCESS) {
    message.error('Tạo đơn hàng thất bại');
  }
  return response;
}

const fetchOrderDetail = async (orderCode: string, type: OrderType = OrderType.SALE_ORDER) => {
  let url = 'order/detail';
  if (type === OrderType.FAST_ORDER) {
    url = 'fast-orders/detail'
  }
  const response = await get<IOrderDetailResponse>(url, { code: orderCode });
  if (response.code === STATUS_CODE.SUCCESS) {
    const { data } = response;
    const [firstItems] = data.itemDetail.elements;
    if (firstItems) {
      const { userEmail, userId, userPhone } = firstItems;
      response.data = {
        ...data, userEmail, userId, userPhone
      }
    }
  }
  return response;
}

const fetchListOrder = async (params: IOrderListRequest) => {
  const response = await get<Pagination<IOrderResponse>>('order/list-order', filterObjectValue(params));
  return response;
}

const fetchListFastOrder = async (params: IOrderListRequest) => {
  return await get<Pagination<IOrderResponse>>('fast-orders', filterObjectValue(params));
}

// const updateOrderStatus = async (params: IOrderUpdateStatusRequest) => {
//   return await post<unknown>('fast-orders/change-status', params);
// }

const fetchFastOrderDetail = async (code: string) => {
  return await get<IFastOrderDetail>('fast-orders/detail', { code });
}

const createFastOrder = async (params: ICreateFastOrderRequest) => {
  const { data, code, ...rest } = await post<string>('fast-orders/create', params);
  if (code === STATUS_CODE.SUCCESS) {
    return {
      code,
      ...rest,
      data: { code: data }
    }
  }
  return {
    data: { code: '' }, code, ...rest
  }
}

const updateOrderStatus = async (params: IOrderUpdateStatusRequest, orderType: OrderType) => {
  let url = 'order/change-status';
  if (orderType === OrderType.FAST_ORDER) {
    url = 'fast-orders/change-status';
  }
  return await post<OrderStatus>(url, params);
}

export {
  calculateOrder,
  createOrder,
  fetchOrderDetail,
  fetchListOrder,
  fetchListFastOrder,
  updateOrderStatus,
  fetchFastOrderDetail,
  createFastOrder,
};

