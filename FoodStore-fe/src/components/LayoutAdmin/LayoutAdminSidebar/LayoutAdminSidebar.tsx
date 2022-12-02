import routes from '@/routes/admin';
import { Menu, Tooltip } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import style from './index.module.scss';

const config = routes[0].children || [];

const getKeyByPathname = (path: string) => config.find(route => route.path === path)?.key || 'dashboard';

const getItems = (onClick: (path: string) => void) => config.map(({ Icon, ...route }) => ({
  key: route.key,
  icon: Icon ? <Icon /> : null,
  label: <Tooltip title={route.name} placement="right"><div className='text-eclipse'>{route.name}</div></Tooltip>,
  onClick: () => onClick(route.path || '')
} as ItemType))

const LayoutAdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys] = useState([getKeyByPathname(location.pathname.split('/').slice(-1)[0])]);

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <div className={style['logo']} />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={selectedKeys}
        items={getItems(handleNavigate)}
      />
    </>
  )
}

export default LayoutAdminSidebar