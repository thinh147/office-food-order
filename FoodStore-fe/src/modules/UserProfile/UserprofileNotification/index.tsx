import React from 'react'
import { Row, Col, Typography } from 'antd';
import { Table } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const UserprofileNotification = () => {

    const columns = [
        {
            title: 'STT',
            dataIndex: '1',
            width: '10%',
        },
        {
            title: 'Thời gian',
            dataIndex: '2',
            width: '30%',
        },
        {
            title: 'Nội dung',
            dataIndex: '3',
            width: '60%',
        },
    ];

    const data = [
        {
            1: '',
            2: '',
            3: ''
        },

    ];
    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Thông báo</Title>
            </div>
            <div className='information'>
                <Row>
                    <Col span={24}>
                        <Table columns={columns} dataSource={data}  pagination={false} />
                        <h1 style={{ textAlign: 'center' }}> <FrownOutlined style={{ fontSize: '95px', color: '#ffa940' }} /></h1>
                        <h1 style={{ textAlign: 'center' }}>Không tìm thấy thông tin</h1>
                        <h4 style={{ textAlign: 'center' }}>Xin lỗi, bạn chưa có thông tin lịch sử thanh toán</h4>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default UserprofileNotification