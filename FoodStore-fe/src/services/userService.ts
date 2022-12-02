import { IAddressRequest } from "@core/models/serverRequest";
import { Pagination } from "@core/models/serverResponse";
import { IUserAddress, IUserInfo } from "@core/models/user";
import { get, post } from "./api"

const fetchAllAddress = async () => {
  const response = await get<Pagination<IUserAddress>>('order/list-address', {});
  return response;
}

const createAddress = async (params: IAddressRequest) => {
  const response = await post<IUserAddress>('order/create-address', params);
  return response;
}

const updateAddress = async (params: Required<IAddressRequest>) => {
  const response = await post<IUserAddress>(`order/update-address`, params);
  return response;
}

const deleteAddress = async (id: number) => {
  const response = await post(`order/delete-address/${id}`, {});
  return response;
}

const fetchUserInfo = async () => {
  const response = await get<IUserInfo>('user/user-information', {});
  return response;
}

export {
  fetchAllAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  fetchUserInfo
}