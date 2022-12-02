import { Col, Row } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';
import UserProfileSidebar from './UserProfileSidebar';


const UserProfile = () => {

  return (
    <div >
      <Row gutter={16}>
        <Col span={6}>
          <UserProfileSidebar />
        </Col>
        <Col span={18} >
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;