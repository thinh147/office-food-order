import { DEFAULT_VOUCHER_REQUEST } from "@core/constant/form";
import { STATUS_CODE } from "@core/constant/setting";
import { IVoucherCRUD, IVoucherRequest } from "@core/models/serverRequest";
import { IVoucherResponse, Pagination, ServerResponse } from "@core/models/serverResponse";
import { message } from "antd";
import { get, post } from "./api";

const addVoucher = async (params: IVoucherCRUD) => {
  const response = await post<IVoucherResponse>('admin/create-voucher', params);
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error('Thêm thất bại');
  }
  return {
    ...response,
    data: response.data
  };
}

const getVoucher = async (params: IVoucherRequest = DEFAULT_VOUCHER_REQUEST) => {
  const response = await get<Pagination<IVoucherResponse>>('vouchers', params);
  return {
    ...response,
    data: {
      ...response.data,
      elements: response.data.elements
    }
  }
}
export {
  addVoucher,
  getVoucher
};
