import { useAuthContext } from '@context';
import { defaultAuthState } from '@context/authContext/config';
import { Dropdown, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OPTIONS = [
  {
    label: 'Trang cá nhân',
    value: 'profile'
  }, {
    label: 'Đăng xuất',
    value: 'logout'
  }
];
const menu = (onClick: (value: { label: string, value: string }) => void) => (
  <Menu items={
    OPTIONS.map((item) => ({
      key: `${item.value}`,
      label: item.label,
      onClick: () => onClick(item)
    } as ItemType))
  }>
  </Menu>
);

const LayoutHomepageProfile = () => {
  const { logout, auth: { user } } = useAuthContext();
  const navigate = useNavigate();
  const onMenuClick = ({ value }: { label: string, value: string }) => {
    if (value === 'logout') {
      logout();
      return;
    }
    navigate(`/${value}`);
  }

  return (
    <Dropdown overlay={menu(onMenuClick)} placement="bottom" arrow >
      <div className='d-flex align-items-center gap-8'>
        <FaUserCircle style={{ fontSize: '32px', color: '#fff' }} className="pointer" />
        <span className='text-white pointer' style={{ lineHeight: 'normal' }}>{user.name || user.email}</span>
      </div>
    </Dropdown>
  )
}

export default LayoutHomepageProfile