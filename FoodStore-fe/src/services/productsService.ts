import { STATUS_CODE } from "@core/constant/setting";
import { parseJSON } from "@core/helpers/converter";
import { filterObjectValue } from "@core/helpers/utils";
import { IProductMetaData } from "@core/models/order";
import { IProductRequest } from "@core/models/serverRequest";
import { IProductDetail, IProductResponse, IUploadFileResponse, Pagination, ServerResponse } from "@core/models/serverResponse";
import { IFormProductCRUD } from "@modules/admin/config/product";
import { message } from "antd";
import { get, post } from "./api";

const getProducts = async (request: IProductRequest): Promise<ServerResponse<Pagination<IProductResponse>>> => {
  const response = await get<Pagination<IProductResponse>>('products', filterObjectValue(request));

  return {
    ...response,
    data: {
      ...response.data,
      elements: response.data.elements.map(sanitizeProduceResponse)
    }
  };
}

const getProductDetail = async (id: number): Promise<ServerResponse<IProductDetail>> => {

  const response = await get<IProductDetail>(`products/product-detail/${id}`, {});

  return {
    ...response,
    data: sanitizeProduceResponse(response.data)
  };
}

const deleteProduct = async (params: { id: number[] }) => {
  const response = await post<string>('products/delete-product', params);
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error('Xóa thất bại');
  }
  if (response.code === STATUS_CODE.SUCCESS) {
    message.success('xóa thành công')
  }
  return response;
}

const addProduct = async (params: IFormProductCRUD) => {
  const response = await post<IProductResponse>('products/add', initFormData(params));
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error('Thêm thất bại');
  }
  return {
    ...response,
    data: sanitizeProduceResponse(response.data)
  };
}

const updateProduct = async (id: number, params: IFormProductCRUD) => {
  const response = await post<IProductResponse>('products/add', initFormData({
    ...params,
    id
  }));
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error('Cập nhật thất bại');
  }
  return {
    ...response,
    data: sanitizeProduceResponse(response.data)
  };
}

type FormKey = keyof Omit<IFormProductCRUD, 'image' | 'metaDataReqs'>

const initFormData = (params: IFormProductCRUD) => {
  const form = new FormData();
  const { image, metaDataReqs, ...rest } = params;
  Object.keys(rest).forEach((key) => {
    form.append(key, rest[key as FormKey] + '');
  });
  if (image) {
    image.forEach(item => {
      form.append('image', item.originFileObj);
    });
  }
  form.append('metaDataReqs', JSON.stringify(metaDataReqs));
  return form;
}

const uploadImage = (file: File | Blob) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = post<IUploadFileResponse>('products/upload-image', formData);
  return response;
}

const sanitizeProduceResponse = <T extends IProductResponse>(response: T): T => {
  if (!response || !response.metaData) return response;
  const metadataProperty = parseJSON(response.metaData, [] as IProductMetaData[]);
  return {
    ...response,
    metadataProperty
  }
}

export {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct,
  getProductDetail,
  uploadImage
};
