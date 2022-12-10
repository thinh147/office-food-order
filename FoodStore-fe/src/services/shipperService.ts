import { STATUS_CODE } from "@core/constant/setting";
import { filterObjectValue } from "@core/helpers/utils";
import { ICartInfo, IFastOrderDetail, IPropertySetting, OrderStatus, OrderType } from "@core/models/order";
import { ICreateFastOrderRequest, ICreateOrderRequest, IOrderListRequest, IOrderUpdateStatusRequest } from "@core/models/serverRequest";
import { ICreateOrderResponse, IOrderDetailResponse, IOrderResponse, Pagination } from "@core/models/serverResponse";
import { message } from "antd";
import { get, post } from "./api";

const fetchListOrder = async () => {
  const response = await get<Pagination<IOrderResponse>>('shipper', {});
  return response;
}

const fetchListFastOrder = async (params: IOrderListRequest) => {
  return await get<Pagination<IOrderResponse>>('fast-orders', filterObjectValue(params));
}

const approvedThisOrder = async (params: IOrderUpdateStatusRequest, id: number) => {
    let url = 'shipper/approve';
    return await post<OrderStatus>(url, params);
  }
  
export {
  fetchListOrder,
  fetchListFastOrder,
  approvedThisOrder
};

