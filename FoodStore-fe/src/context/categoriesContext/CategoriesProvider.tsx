import { ProviderContextProps } from '@context/ProviderContext';
import { STATUS_CODE, STORAGE_KEY } from '@core/constant/setting';
import { Channel, ICategory } from '@core/models/order';
import { getMainCategories, getSubCategories } from '@services/categoriesService';
import React, { useCallback, useEffect, useState } from 'react'
import { CategoriesContext } from './config'

const CategoriesProvider = ({ children }: ProviderContextProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    // call api
    fetchMainCategories();
  }, []);

  const getMainLocalCategories = () => categories;

  const getSubLocalCategories = (id: number) => {
    const parent = categories.find(category => category.id === id);
    if (!parent) {
      return []
    }
    return [...parent.children];
  }

  const fetchMainCategories = async () => {
    const response = await getMainCategories();
    if (response.code === STATUS_CODE.SUCCESS) {
      setCategories(response.data);
    }
  }

  const getAllSubByChannelCategories = useCallback((channel: Channel) => {
    return categories.filter(category => category.channel === channel)
      .reduce((acc, cur) => acc.concat(cur.children), [] as ICategory[]);
  }, [categories]);

  return (
    <CategoriesContext.Provider value={{ categories, getMainCategories: getMainLocalCategories, getSubCategories: getSubLocalCategories, getAllSubByChannelCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesProvider