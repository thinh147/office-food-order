import { parseJSON } from "@core/helpers/converter";
import { ICartItem, IProductMetaData } from "@core/models/order";
import { ICartRequest } from "@core/models/serverRequest";
import { ICartResponse, ServerResponse } from "@core/models/serverResponse";
import { get, post } from "./api";

const fetchCart = async (): Promise<ServerResponse<ICartResponse>> => {
  const response = await get<ICartResponse>('cart/get-cart', {});
  const items = response.data.items?.map(sanitizeCartItem) || [];
  return {
    ...response,
    data: {
      ...response.data,
      items,
    }
  };
}

const fetchAddToCart = async (params: ICartRequest) => {
  const response = await post<ICartItem>('cart/add-to-cart', params);
  return {
    ...response,
    data: sanitizeCartItem(response.data)
  };
}

const fetchDeleteCart = async (params: { id: number }) => {
  const response = await post('cart/delete', params);
  return response;
}

const sanitizeCartItem = (response: ICartItem) => {
  if (!response || !response.metaData) return response;
  const metadataProperty = parseJSON(response.metaData, [] as IProductMetaData[]);
  return {
    ...response,
    metadataProperty
  }
}

export {
  fetchCart,
  fetchAddToCart,
  fetchDeleteCart
};
