import { IAdvertisementSetting } from "@core/models/config";
import { IPropertySetting } from "@core/models/order";
import { Pagination } from "@core/models/serverResponse";
import { get, post } from "./api"

const getProperty = async () => {
  const response = await get<Pagination<IPropertySetting>>('admin/properties', {});
  return {
    ...response,
    data: response.data.elements.pop() || {} as IPropertySetting
  };
}

const fetchSaveProperty = async (params: IPropertySetting) => {
  const response = await post<IPropertySetting>('admin/property/save', params);
  return response
}
const getNewestProperty = async () => {
  const response = await get<IPropertySetting>('admin/newest-property', {});
  return {
    ...response,
    data: response.data || {} as IPropertySetting
  };
}
const updateAdvertisementSetting = async (params: Partial<IAdvertisementSetting>) => {
  const response = await post<IAdvertisementSetting>('admin/update-section', params);
  return response;
}
const getAdvertisementSetting = async () => {
  return await get<IAdvertisementSetting>('home/section/1', {});
}
export {
  getProperty,
  fetchSaveProperty,
  getNewestProperty,
  updateAdvertisementSetting,
  getAdvertisementSetting
}