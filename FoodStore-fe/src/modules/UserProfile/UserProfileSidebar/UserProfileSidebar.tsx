import { ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const items: ItemType[] = [
  {
    label: 'Tài khoản của tôi',
    icon: <UserOutlined />,
    key: 'management',
    children: [
      {
        key: 'profile-info_',
        label: 'Thông tin cá nhân'
      },
      {
        key: '/profile/change-password',
        label: 'Thay đổi mật khẩu'
      },
      {
        key: '/profile/point',
        label: 'Điểm của tôi'
      },
    ],
  },
  {
    key: 'profile-info_goods-management',
    label: 'Quản lý mua hàng',
    icon: <ShoppingOutlined />,
    children: [
      // { label: 'Đơn hàng menu có sẵn', key: '/profile/transaction/amazon' },
      { label: 'Lịch sử đặt hàng', key: '/profile/transaction/request' },
    ]
  },
]

const UserProfileSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string[] | undefined>();

  useEffect(() => {
    const [first, second, third] = location.pathname.split('/');
    if (third) {
      setActiveItem([location.pathname]);
    } else {
      setActiveItem(['profile-info_'])
    }

  }, [location])


  const handleNavigate = (key: string) => {
    const [first] = key.trim().split('_');
    if (first === 'profile-info') {
      navigate('/profile')
    } else {
      navigate(key);
    }
  };

  return (
    <Menu onClick={({ key }) => handleNavigate(key)} style={{ width: '100%' }} defaultSelectedKeys={['profile-info_']}
      defaultOpenKeys={['management', 'profile-info_goods-management']} mode="inline" items={items} selectedKeys={activeItem}>
    </Menu>
  )
}

export default UserProfileSidebar