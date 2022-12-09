import { AddressFrom } from '@components/FormComponents';
import { GENDER } from '@core/constant/form';
import { STATUS_CODE } from '@core/constant/setting';
import { fetchUserInfo } from '@services/userService';
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './index.scss';



const { Text, Title } = Typography;

const UserProfileInformation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetchUserInfo();
      if (response.code === STATUS_CODE.SUCCESS) {
        const { dateOfBirth, ...info } = response.data;
        form.setFieldsValue({ ...info, dateOfBirth: moment(dateOfBirth) });
      }
    })();
  }, []);


  const onFinish = (values: any) => {
    console.log(values);
  };

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
  return (
    <div style={{ paddingBottom: '20px'}}>
      <div className='half-circle'>
      </div>
      <div className='title'>
        <Title level={5}>Thông tin cá nhân</Title>
      </div>
      <div className='information'>
        <Row className="p-16" gutter={16}>
          <Col span={12}>
            <AddressFrom onClickAddress={(address) => console.log(address)}></AddressFrom>
          </Col>
          <Col span={12} >
            <Form labelCol={{ span: 24, }} wrapperCol={{ span: 24, }} form={form} layout="vertical"
              name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item name='email' label="Tài khoản" >
                <Input disabled />
              </Form.Item>
              <Form.Item name='fullName' label="Họ tên đầy đủ" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name='phone' label="Số điện thoại" >
                <Input addonBefore={'+84'} />
              </Form.Item>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name='dateOfBirth' label="Ngày sinh">
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='gender' label="Giới tính" rules={[{ required: true, message: 'Chọn giới tính!', },]} >
                    <Select placeholder="Chọn giới tính">
                      {
                        GENDER.map(gender => (<Option value={gender.value} key={gender.value}>{gender.label}</Option>))
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Button type="primary" htmlType="submit" loading={loading}>
                Lưu
              </Button>
            </Form>
          </Col>

        </Row>
      </div>

    </div>
  )
}

export default UserProfileInformation