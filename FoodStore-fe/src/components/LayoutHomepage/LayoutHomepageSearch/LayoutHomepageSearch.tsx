import { Button, Dropdown, Input, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const OPTIONS = [
  {
    label: 'Tất cả',
    value: 'all'
  },
  {
    label: 'Đồ ăn',
    value: '1'
  },
  {
    label: 'Thức uống',
    value: '2'
  },
]

const menu = (onClick: (value: { label: string, value: string }) => void) => {
  const items = OPTIONS.map((item) => ({
    key: `${item.value}_${item.label}`,
    onClick: () => onClick(item),
    label: item.label
  } as ItemType))
  return (
    <Menu items={items} />
  )
};
const LayoutHomepageSearch = () => {
  const [searchOption, setSearchOption] = useState({
    label: 'Tất cả',
    value: 'all'
  });
  const navigation = useNavigate();
  const onMenuClick = (value: { label: string, value: string }) => {
    setSearchOption(value);
  }

  const onSearch = (value: string) => {
    const params = {
      search: value
    };
    navigation({
      pathname: `product/${searchOption.value}`,
      search: new URLSearchParams(params).toString()
    })
  }

  return (
    <div className='search_bar'>
      <Dropdown overlay={menu(onMenuClick)} placement="bottom" >
        <Button>{searchOption.label} <IoChevronDownOutline /></Button>
      </Dropdown>
      <Input.Search allowClear defaultValue="" onSearch={onSearch} placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm..." />
    </div>
  )
}

export default LayoutHomepageSearch