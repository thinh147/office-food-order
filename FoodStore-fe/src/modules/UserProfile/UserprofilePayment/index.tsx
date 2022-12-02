import React, { useState } from 'react'
import { Row, Col, Button, Typography } from 'antd';
import { Table } from 'antd';
import { Menu } from 'antd';
import './index.scss';
import { FrownOutlined } from '@ant-design/icons';


const { Title } = Typography;
const { SubMenu } = Menu;

const UserprofilePayment = () => {

    const [isProfile, setisProfile] = useState(1)

    const handleClick = (info: any) => {
        setisProfile(info.key);
    };

    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Ví của tôi</Title>
            </div>
            <div >
                <Row>
                    <Col span={12} className='card-heard'>
                        <div className='information-2' style={{ padding: '20px' }}>
                            <Col span={11} >
                                <b>Tổng số dư</b>
                                <br />
                                <p dir="ltr"><strong style={{ color: '#ffa940' }} >1 coin = 1.000đ</strong></p>
                            </Col>
                            <Col span={13}>
                                <Button type="primary" style={{ marginRight: '2px' }}>
                                    Nạp tiền
                                </Button>
                                <Button type="primary">
                                    Rút Tiền
                                </Button>
                            </Col>
                        </div>
                    </Col>
                    <Col className='card-heard' span={6}>
                        <div className='information' style={{ padding: '20px' }}>
                            <b>Số dư khả dụng</b>
                            <br />
                            <p dir="ltr"><strong style={{ color: '#ffa940' }} > 0 đồng</strong></p>
                        </div>
                    </Col>
                    <Col className='card-heard' span={6}>
                        <div className='information-2' style={{ padding: '20px' }}>
                            <Col  >
                                <b>Số dư đóng băng</b>
                                <br />
                                <p dir="ltr"><strong style={{ color: '#ffa940' }} >1 coin = 1.000đ</strong></p>
                            </Col>
                        </div>
                    </Col>
                </Row>
                <Col className='payment'>
                    <Menu onClick={handleClick} style={{ width: '100%' }} defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']} mode="horizontal">
                        <Menu.Item key="1" >Tổng hợp giao dịch </Menu.Item>
                        <Menu.Item key="2">Thanh toán</Menu.Item>
                        <Menu.Item  key="3" >Nạp tiền</Menu.Item>
                        <Menu.Item  key="4" >Rút tiền </Menu.Item>
                        <Menu.Item  key="5" >Tiền ngoài </Menu.Item>
                        <Menu.Item  key="6" >Hoàn tiền </Menu.Item>
                    </Menu>
                </Col>
                <Col className='payment2'>
                    <h1 style={{ textAlign: 'center' }}> <FrownOutlined style={{ fontSize: '95px', color: '#ffa940' }} /></h1>
                    <h1 style={{ textAlign: 'center' }}>Không tìm thấy thông tin</h1>
                    <h4 style={{ textAlign: 'center' }}>Xin lỗi, bạn chưa có thông tin ngân hàng</h4>
                </Col>
            </div>
        </div >
    )
}

export default UserprofilePayment