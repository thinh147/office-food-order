import React from 'react'
import { Row, Col, Button, Typography } from 'antd';
import { Table } from 'antd';

const { Title } = Typography;

const UserprofileProductManagement = () => {


    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Danh sách yêu thích</Title>
            </div>
            <div >
                <Row>
                    <Col>
                        <div style={{ padding: '30px' }}>
                            <Title type="secondary" level={4}>Bạn chưa có sản phẩm nào trong danh sách</Title>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default UserprofileProductManagement