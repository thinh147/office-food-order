import LayoutHomepageHeaderSkeleton from '@components/Skeleton/LayoutHomepageHeaderSkeleton';
import { Layout, Skeleton } from 'antd';
import React, {lazy, Suspense } from 'react';
import Button from 'antd';
import { Outlet } from 'react-router-dom';
import './index.scss';

const { Content } = Layout;

const LayoutHomepageHeader = lazy(() => import('./LayoutHomepageHeader'));
const LayoutHomepageFooter = lazy(() => import('./LayoutHomepageFooter'));


const LayoutHomepage = (): JSX.Element => {
  return (
    <Layout className="layout">
      <Suspense fallback={<LayoutHomepageHeaderSkeleton />}>
        <LayoutHomepageHeader />
      </Suspense>
      <Content className='main' >
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      {/* <div className="btn">
      <Button>
              Chat
            </Button>
      </div> */}
      
      <Suspense fallback={<Skeleton />}>
        <LayoutHomepageFooter />
      </Suspense>
    </Layout>

  );
};
export default LayoutHomepage;