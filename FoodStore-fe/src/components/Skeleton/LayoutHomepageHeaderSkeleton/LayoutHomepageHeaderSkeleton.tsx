import { Skeleton } from 'antd';
import React from 'react';
import '@components/LayoutHomepage/index.scss';
const LayoutHomepageHeaderSkeleton = () => {
  return (
    <div className='container_header categories'>
      <div className='container_header__main'>
        <div className="logo pointer" >
          <Skeleton.Avatar active style={{ width: '70px', height: '70px' }} />
        </div>
        <Skeleton.Button block={true} active style={{ height: '70px' }} />
        <div className='d-flex align-items-center gap-16'>
          <Skeleton.Input active size='large' style={{ height: '70px' }} />
        </div>
      </div>
    </div>
  )
}

export default LayoutHomepageHeaderSkeleton