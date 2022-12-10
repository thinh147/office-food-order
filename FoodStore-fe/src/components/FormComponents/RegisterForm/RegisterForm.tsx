import { GENDER, MAP_GENDER_TO_NUMBER } from '@core/constant/form';
import { STATUS_CODE } from '@core/constant/setting';
import { IRegisterRequest } from '@core/models/serverRequest';
import { IAuthResponse } from '@core/models/serverResponse';
import { Gender } from '@core/models/user';
import { register } from '@services/authService';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { Moment } from 'moment';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillKeyFill } from 'react-icons/bs';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import style from './index.module.scss';
interface Props {
  onRegisterSuccess?: (data: IAuthResponse) => void;
  onLogin?: () => void;
}

interface IRegisterForm {
  name: string;
  password: string;
  confirm: string;
  email: string;
  dateOfBirth: Moment;
  gender: Gender;
  phone: string;
}

const RegisterForm = ({ onLogin, onRegisterSuccess }: Props) => {
  const [loading, setLoading] = useState(false)
  const onFinish = async (value: IRegisterForm) => {
    setLoading(true);
    const request: IRegisterRequest = {
      ...value,
      dateOfBirth: value.dateOfBirth.toISOString(),
      gender: MAP_GENDER_TO_NUMBER[value.gender]
    }
    const response = await register(request);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      onRegisterSuccess && onRegisterSuccess(response.data);
    }
  }

  const onFinishFailed = (value: ValidateErrorEntity<IRegisterForm>) => {
    console.log(value);
  }

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelAlign="left"
      labelWrap
      layout="horizontal"
      size={'middle'}
      style={{ padding: '0px 16px 0 8px' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Tên không được để trống!' }]}
      >
        <Input prefix={<AiOutlineUser />} placeholder="Họ và Tên" />
      </Form.Item>
      <div className={style['form-wrapper']}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Mật khẩu trống!' }]}
          className={style['form-wrapper__item']}
          hasFeedback
        >
          <Input.Password prefix={<BsFillKeyFill />} placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirm"
          className={style['form-wrapper__item']}
          rules={[
            {
              required: true,
              message: 'Bạn xác nhận mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không giống nhau!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<BsFillKeyFill />} placeholder="Xác nhận mật khẩu" />
        </Form.Item>
      </div>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Email không được để trống!' }]}

      >
        <Input prefix={<MdOutlineAlternateEmail />} placeholder="email" />
      </Form.Item>
      <Form.Item name="phone">
        <InputNumber addonBefore="+84" placeholder="Số điện thoại" style={{ width: '100%' }} />
      </Form.Item>
      <div className={style['form-wrapper']}>
        <Form.Item className={style['form-wrapper__item']} name="gender" >
          <Select placeholder="Chọn giới tính" style={{ flex: 1 }}>
            {
              GENDER.map(gender => (<Select.Option value={gender.value} key={gender.value}>{gender.label}</Select.Option>))
            }
          </Select>
        </Form.Item>
        <Form.Item className={style['form-wrapper__item']} name="dateOfBirth" >
          <DatePicker placeholder='Ngày sinh' />
        </Form.Item>
      </div>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button htmlType='submit' type='primary' style={{ marginRight: '8px' }} disabled={loading} >Đăng ký</Button>
        <Button onClick={onLogin} htmlType="button" type="primary" ghost disabled={loading}>Đăng nhập</Button>
      </Form.Item>
    </Form >

  )
}

export default RegisterForm