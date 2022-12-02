import { IAdvertisementSetting, IPropertyContext } from "@core/models/config";
import { IPropertySetting } from "@core/models/order";
import { createContext, useContext } from "react";



export const defaultState: IPropertySetting = {} as IPropertySetting;

export const PropertyContext = createContext<IPropertyContext>({
  property: defaultState,
  advertisement: {} as IAdvertisementSetting,
  saveProperty: () => ({}),
  setAdvertisement: () => ({})
})

const usePropertyContext = () => useContext(PropertyContext);
export const useAdvertisementSetting = () => usePropertyContext().advertisement;
export default usePropertyContext;
