import { FrownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import React, { useState } from 'react';
import './index.scss';



const { Text, Title } = Typography;

const UserprofileBankAccount = () => {
    const [form] = Form.useForm();
    const [active, setActive] = useState<boolean>(false)
    const onFinish = (values: any) => {
        console.log(values);
    };
    const bank = [
        { label: '--- Chọn ngân hàng ---', value: '0' },
        { label: 'Ngân hàng TMCP Ngoại Thương Việt Nam', value: '1' },
        { label: 'Ngân hàng TMCP Kiên Long', value: '2' },
        { label: 'Ngân hàng TMCP Sài Gòn Công Thương', value: '3' },
        { label: 'Ngân hàng TMCP Xăng Dầu Petrolimex', value: '4' },
        { label: 'Ngân hàng Công nghiệp Hàn Quốc', value: '5' },
        { label: 'Ngân hàng Industrial Bank of Korea - CN TP.HC', value: '6' },
        { label: 'Ngân hàng Liên Doanh Việt Nga', value: '7' },
        { label: 'Ngân hàng Nông Nghiệp và Phát triển Nông Thôn', value: '8' },
        { label: 'Ngân hàng TM TNHH MTV Dầu Khí Toàn Cầu', value: '9' },
        { label: 'Ngân hàng TMCP Á Châu', value: '10' },
        { label: 'Ngân hàng TMCP An Bình', value: '11' },
        { label: 'Ngân hàng TMCP Bắc Á', value: '12' },
        { label: 'Ngân hàng TMCP Bảo Việt', value: '13' },
        { label: 'Ngân hàng TMCP Bưu Điện Liên Việt', value: '14' },
        { label: 'Ngân hàng TMCP Công Thương Việt Nam', value: '15' },
        { label: 'Ngân hàng TMCP Đại Chúng Việt Nam', value: '16' },
        { label: 'Ngân hàng TMCP Đại Dương', value: '17' },
        { label: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', value: '18' },
        { label: 'Ngân hàng TMCP Đông Á', value: '19' },
        { label: 'Ngân hàng TMCP Đông Nam Á', value: '20' },
        { label: 'Ngân hàng TMCP Hàng Hải Việt Nam', value: '21' },
        { label: 'Ngân hàng TMCP Kỹ thương Việt Nam', value: '22' },
        { label: 'Ngân hàng TMCP Nam Á', value: '23' },
        { label: 'Ngân hàng TMCP Phát Triển Thành Phố Hồ Chí Mi', value: '24' },
        { label: 'Ngân hàng TMCP Phương Đông', value: '25' },
        { label: 'Ngân hàng TMCP Quân Đội', value: '26' },
        { label: 'Ngân hàng TMCP Quốc Dân', value: '27' },
        { label: 'Ngân hàng TMCP Quốc Tế', value: '28' },
        { label: 'Ngân hàng TMCP Sài Gòn', value: '29' },
        { label: 'Ngân hàng TMCP Sài Gòn - Hà Nội', value: '30' },
        { label: 'Ngân hàng TMCP Sài Gòn Thương Tín', value: '31' },
        { label: 'Ngân hàng TMCP Tiên Phong', value: '32' },
        { label: 'Ngân hàng TMCP Việt Á', value: '33' },
        { label: 'Ngân hàng TMCP Việt Nam Thịnh Vương', value: '34' },
        { label: 'Ngân hàng TMCP Việt Nam Thương Tín', value: '35' },
        { label: 'Ngân hàng TMCP Xuất nhập khẩu Việt Nam', value: '36' },
        { label: 'Ngân hàng TNHH Indovina', value: '37' },
        { label: 'Ngân hàng TNHH MTV CIMB Việt Nam', value: '38' },
        { label: 'Ngân hàng TNHH MTV Hongleong Việt Nam', value: '39' },
        { label: 'Ngân hàng TNHH MTV Public Việt Nam', value: '40' },
        { label: 'Ngân hàng TNHH MTV Shinhan Việt Nam', value: '41' },
        { label: 'Ngân hàng TNHH MTV United Overseas Bank', value: '42' },
        { label: 'Ngân hàng Wooribank', value: '43' },
    ];

    const add = () => {
        setActive(!active);
    };

    const { Option } = Select;
    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Danh sách tài khoản ngân hàng</Title>
            </div>
            <div className='information'>
                <Row style={{ padding: '20px' }}>
                    <Col span={24}>
                        <h1 style={{ textAlign: 'center' }}> <FrownOutlined style={{ fontSize: '95px', color: '#ffa940' }} /></h1>
                        <h1 style={{ textAlign: 'center' }}>Không tìm thấy thông tin</h1>
                        <h4 style={{ textAlign: 'center' }}>Xin lỗi, bạn chưa có thông tin ngân hàng</h4>

                        <Button style={{ marginBottom: '20px' }} type="dashed" onClick={add} block icon={<PlusOutlined />}>
                            Add field
                        </Button>

                        {active ?
                            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                                <Form.Item name='bank' label="Chọn loại tài khoản">
                                    <Select options={bank} />
                                </Form.Item>
                                <Space style={{ display: 'flex', marginBottom: 8 }}>
                                    <Form.Item name='number' label="Số tài khoản">
                                        <Input placeholder="Số tài khoản...." />
                                    </Form.Item>
                                    <Form.Item name='brank' label="Chi nhánh">
                                        <Input placeholder="Chi nhánh...." />
                                    </Form.Item>
                                </Space>
                                <Space style={{ display: 'flex', marginBottom: 8 }}>
                                    <Form.Item name='name' label="Tên tài khoản">
                                        <Input placeholder="Tên tài khoản ngân hàng...." />
                                    </Form.Item>
                                </Space>
                                <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                                    <Button size={'large'} style={{ marginRight: '7px' }} type="primary" htmlType="submit">
                                        Cập nhật tài khoản
                                    </Button>
                                    <Button size={'large'} htmlType="submit" onClick={add}>
                                        Hủy
                                    </Button>
                                </Form.Item>
                            </Form>
                            : null
                        }
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default UserprofileBankAccount