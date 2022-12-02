import useAuthContext from '@context/authContext/config';
import { ProviderContextProps } from '@context/ProviderContext';
import { STATUS_CODE } from '@core/constant/setting';
import { IAdvertisementSetting } from '@core/models/config';
import { IPropertySetting } from '@core/models/order'
import { getProperty, fetchSaveProperty, getAdvertisementSetting } from '@services/propertyService';
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { PropertyContext } from './config';


const PropertyProvider = ({ children }: ProviderContextProps) => {
  const [property, setProperty] = useState<IPropertySetting>({} as IPropertySetting);
  const { auth: { token } } = useAuthContext();
  const [advertisement, setAdvertisement] = useState({} as IAdvertisementSetting)
  useEffect(() => {
    (async () => {
      const response = await getAdvertisementSetting();
      if (response.code === STATUS_CODE.SUCCESS) {
        setAdvertisement(response.data);
      }
    })()
    if (!token) return;
    (async () => {
      const response = await getProperty();
      if (response.code === STATUS_CODE.SUCCESS) {
        setProperty(response.data);
      }
    })();

  }, [token]);


  const saveProperty = (data: IPropertySetting) => {
    // 
    handleEffect(data);
  }

  const handleEffect = async (params: IPropertySetting) => {
    const resposne = await fetchSaveProperty(params);
    if (resposne.code === STATUS_CODE.SUCCESS) {
      setProperty(params);
      message.success('Cập nhật thành công');
    }
  }

  return (
    <PropertyContext.Provider value={{ property, saveProperty, advertisement, setAdvertisement }}>
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider