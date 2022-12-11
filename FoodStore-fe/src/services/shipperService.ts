import { filterObjectValue } from "@core/helpers/utils";
import {  IOrderListRequest } from "@core/models/serverRequest";
import {  IOrderResponse, Pagination } from "@core/models/serverResponse";
import { get, post } from "./api";

const fetchListOrder = async (params: IOrderListRequest) => {
  const response = await get<Pagination<IOrderResponse>>('shipper/history', filterObjectValue(params));
  return response;
}

const fetchListFastOrder = async (params: IOrderListRequest) => {
  return await get<Pagination<IOrderResponse>>('shipper', filterObjectValue(params));
};

const acceptOrder = async (orderCode: string) => {
  const params = {
    orderCode
  }
  return post(`shipper/approve`, params);
}

const shipperSuccessOrder = async (orderCode: string) => {
  const params = {
    orderCode
  }
  return post(`shipper/delivery  `, params);
}
  
export {
  fetchListOrder,
  fetchListFastOrder,
  acceptOrder,
  shipperSuccessOrder,
};

