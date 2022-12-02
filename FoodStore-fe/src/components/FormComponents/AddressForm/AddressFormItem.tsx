import { STATUS_CODE } from '@core/constant/setting';
import { ModalProps } from '@core/models/config';
import { IAddressRequest } from '@core/models/serverRequest';
import { IUserAddress } from '@core/models/user';
import { createAddress, updateAddress } from '@services/userService';
import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react'

type Props = ModalProps<IUserAddress>;

type IFormAddress = Omit<IAddressRequest, 'id'>;

const AddressFormItem = ({ data, handleCancel, handleOk }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const prefix = data ? 'Sửa' : 'Thêm';

  const handleFinish = async (value: IFormAddress) => {
    console.log(value);
    setLoading(true);
    const api = data ? updateAddress : createAddress;
    const request = {
      ...value,
      id: data?.addressId || -1
    }
    const response = await api(request);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      message.success('Tạo địa chỉ thành công');
      handleOk(response.data);
    } else {
      message.error('Tạo địa chỉ thất bại');
    }
  }

  return (
    <Modal title={prefix + ' địa chỉ'} visible={true} zIndex={1003}
      onOk={() => handleOk({} as IUserAddress)}
      onCancel={handleCancel}
      footer={
        <>
          <Button type='primary' onClick={() => form.submit()} loading={loading}>{`${prefix} địa chỉ`}</Button>
        </>
      }
    >
      <Form
        form={form}
        initialValues={data || undefined}
        onFinish={handleFinish}
      >
        <Form.Item label="Họ và Tên" name="name" rules={[{ required: true, message: 'Họ và tên không được để trống' }]}>
          <Input placeholder="tên" />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}>
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Địa không được để trống' }]}>
          <Input.TextArea placeholder="địa chỉ" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddressFormItem