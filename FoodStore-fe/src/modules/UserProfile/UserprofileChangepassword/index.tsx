import React from 'react'
import { Form, Input, Button, DatePicker, Select, Row, Col, Typography } from 'antd';
import { GENDER } from '@core/constant/form';
import { FaUserCircle } from 'react-icons/fa';
import './index.scss'

const UserprofileChangepassword = () => {

    const onFinish = (values: any) => {
        console.log(values);
    };
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} không được bỏ trống!',
        types: {
            email: '${label} không phải email!',
            number: '${label} không phải số!',
        },
        number: {
            range: '${label} từ ${min} đến ${max}',
        },
    };
    const { Option } = Select;
    const { Text, Title } = Typography;

    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Đổi mật khẩu</Title>
            </div>
            <div className='information'>
                <Row style={{ padding: '20px' }}>
                    <Col span={18}>
                        <Form labelCol={{ span: 8, }} wrapperCol={{ span: 24, }} layout="horizontal"
                            name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                            <Form.Item name='Oldpassword' label="Mật Khẩu Hiện Tại" rules={[
                                { required: true, message: 'Mật khẩu phải gồm ít nhất 8 ký tự' },
                                { whitespace: true, message: 'Mật khẩu không được dùng ký tự đặc biệt' },
                                { min: 8, message: 'Mật khẩu phải ít nhất 8 ký tự' }
                            ]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="password" label="Mật khẩu mới" rules={[
                                { required: true, message: 'Mật khẩu phải gồm ít nhất 8 ký tự' },
                                { whitespace: true, message: 'Mật khẩu không được dùng ký tự đặc biệt' },
                                { min: 8, message: 'Mật khẩu phải ít nhất 8 ký tự' }
                            ]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="confirm" label="Xác nhận mật khẩu" dependencies={['password']} hasFeedback
                                rules={[
                                    { required: true, message: 'Mật khẩu phải gồm ít nhất 8 ký tự' },
                                    { whitespace: true, message: 'Mật khẩu không được dùng ký tự đặc biệt' },
                                    { min: 8, message: 'Mật khẩu phải ít nhất 8 ký tự' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    Xác nhận
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default UserprofileChangepassword