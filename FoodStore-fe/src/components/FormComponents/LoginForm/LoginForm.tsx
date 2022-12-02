import { STATUS_CODE } from '@core/constant/setting';
import { IAuthResponse } from '@core/models/serverResponse';
import { login } from '@services/authService';
import { Button, Form, Input, Spin } from 'antd';
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import React, { useState } from 'react';

interface ILoginForm {
  username: string;
  password: string;
}

interface Props {
  onLoginSuccess?: (value: IAuthResponse) => void;
  onRegister?: () => void;
}

function LoginForm({ onLoginSuccess, onRegister }: Props) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (value: ILoginForm) => {
    setLoading(true);
    const response = await login(value);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      onLoginSuccess && onLoginSuccess(response.data);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<ILoginForm>) => {
    console.log('Failed:', errorInfo.errorFields);
  };


  return (
    <Form
      name="basic"
      labelCol={{ span: 16 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout='vertical'
    >
      <Form.Item
        label="Email/Số điện thoại"
        name="username"
        rules={[{ required: true, message: 'Email/Số điện thoại không được để trống!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type={loading ? 'ghost' : "primary"} htmlType="submit" disabled={loading}>
          Đăng nhập&nbsp;&nbsp;
          <Spin size="small" spinning={loading} />
        </Button>
        <Button type="primary" style={{ marginLeft: '8px' }} disabled={loading} ghost onClick={() => (onRegister && (onRegister()))}>Đăng ký</Button>
      </Form.Item>
    </Form >
  )
}

export default LoginForm