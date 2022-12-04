import { ProviderContextProps } from '@context/ProviderContext';
import { STATUS_CODE, STORAGE_KEY } from '@core/constant/setting';
import { Channel, ICategory } from '@core/models/order';
import { getMainCategories, getSubCategories } from '@services/categoriesService';
import React, { useCallback, useEffect, useState } from 'react'
import { CategoriesContext } from './config'

const CategoriesProvider = ({ children }: ProviderContextProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [mainCategories, setMainCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    // call api
    fetchMainCategories();
  }, []);

  const getMainLocalCategories = () => mainCategories;

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
      setCategories(response.children);
      setMainCategories(response.data);
    }
  }

  const getAllSubByChannelCategories = useCallback((channel: string) => {
    console.log("Channel", typeof channel);
    console.log("categories",categories);
    return categories.filter((item) => item.parentId === Number(channel));
  }, [categories]);

  return (
    <CategoriesContext.Provider value={{ categories, getMainCategories: getMainLocalCategories, getSubCategories: getSubLocalCategories, getAllSubByChannelCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesProvider