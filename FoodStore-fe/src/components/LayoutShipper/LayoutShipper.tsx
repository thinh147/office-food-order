import { useAuthContext } from '@context';
import { Button, Layout } from 'antd';
import React, { useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { Outlet } from 'react-router';
import style from './index.module.scss';
import LayoutShipperSidebar from './LayoutShipperSidebar';

const { Header, Sider, Content } = Layout;

const LayoutShipper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuthContext();
  
  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={`20%`}>
        <LayoutShipperSidebar />
      </Sider>
      <Layout className={style['site-layout']}>
        <Header className={`${style['site-layout-background']}  d-flex justify-content-between align-items-center`} style={{ paddingLeft: 0 }}>
          <div className={`${style['trigger']}`} onClick={toggleCollapse}>
            {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          </div>
          <Button type='primary' onClick={() => logout()}>Logout</Button>
        </Header>
        <Content
          className={style['site-layout-background']}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutShipper