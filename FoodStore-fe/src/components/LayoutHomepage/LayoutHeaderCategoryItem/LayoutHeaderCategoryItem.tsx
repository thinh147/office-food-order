import useCategoriesContext from '@context/categoriesContext/config';
import { ICategory } from '@core/models/order';
import { Dropdown, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  categories: ICategory[];
  page: string;
}

export const categoryToMenuItem = (category: ICategory): ItemType => {
  const { children, id, name, channel, title, parentId } = category;
  const key = `${title}_${id}`;
  return {
    key,
    label: title || name,
    children: children && children.length ? children.map(category => categoryToMenuItem(category)) : undefined,
  }
}

const LayoutHeaderCategoryItem = (props: Props) => {
  const navigation = useNavigate();
  const { categories, page } = props;

  const menuGenerator = () => {
    const subCategories:ICategory[] = [];
    categories.map((category) => {
      if(category.children) {
        category.children.map((item) => {
          subCategories.push(item)
        })
      }
    })
    
    return (
      <Menu items={subCategories.map((subCategory) => categoryToMenuItem(subCategory))} onClick={({ key }) => handleMenuClick(key)} />
    )
  };

  const overlay = menuGenerator();

  const handleMenuClick = (key: string) => {
    const params = {
      categories: key
    };
    navigation({
      pathname: `product/${page}`,
      search: new URLSearchParams(params).toString()
    })
  }

  return (
    <Dropdown overlay={overlay} placement="bottomLeft">
      {props.children}
    </Dropdown>
  )
}

export default LayoutHeaderCategoryItem