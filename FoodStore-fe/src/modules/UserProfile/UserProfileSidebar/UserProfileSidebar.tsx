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
      // {
      //   key: 'profile-info_bank-account',
      //   label: 'Tài khoản ngân hàng'
      // },
      // {
      //   key: 'profile-info_rank',
      //   label: 'Cấp bậc của tôi'
      // },
      {
        key: '/profile/point',
        label: 'Điểm của tôi'
      },
      // {
      //   key: 'profile-info_collaborators',
      //   label: 'Hạng cộng tác viên'
      // },
    ],
  },
  // {
  //   key: 'profile-info_notification',
  //   label: 'Thông báo',
  //   icon: <NotificationOutlined />
  // },
  // {
  //   key: 'profile-info_payment',
  //   label: 'Thanh toán/ Ví 1993',
  //   icon: <ShoppingCartOutlined />
  // },
  {
    key: 'profile-info_goods-management',
    label: 'Quản lý mua hàng',
    icon: <ShoppingOutlined />,
    children: [
      { label: 'Đơn hàng Amazon/Mercari', key: '/profile/transaction/amazon' },
      { label: 'Đơn hàng theo yêu cầu', key: '/profile/transaction/request' },
      { label: 'Đơn hàng FastFood Store', key: '/profile/transaction/1993', disabled: true },
      { label: 'Kiện hàng gom', key: '/profile/transaction/collect', disabled: true },
    ]
  },
  // { label: 'Danh sách yêu thích', key: 'profile-info_product-management', icon: <SolutionOutlined /> },
  // { label: 'Quản lý sản phẩm ', key: 'profile-info_product-management', icon: <ProfileOutlined /> },
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