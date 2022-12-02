import { ICreatePaymentRequest } from "@core/models/serverRequest"
import { post } from "./api"

const createPayment = async (params: ICreatePaymentRequest) => {
  const response = await post('payment/create', params);
  return response;
}

export {
  createPayment
}