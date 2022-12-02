import { STATUS_CODE } from '@core/constant/setting';
import { ModalProps } from '@core/models/config';
import { IOrderFormCRUD, OrderStatus, OrderType } from '@core/models/order';
import { IOrderDetailResponse, IOrderResponse } from '@core/models/serverResponse';
import { updateOrderStatus } from '@services/orderService';
import { Button, Form, Modal, Select } from 'antd';
import { useState } from 'react';
import { fastOrderStatusOption } from '../../admin/config/fastOrder';


const ShipperOrderListEdit = ({ handleCancel, handleOk, data }: ModalProps<IOrderResponse, OrderStatus>) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //   useEffect(() => {

  //   }, [data]);

  const onSubmit = () => {
    form.submit();
  }

  const onFinish = async (values: IOrderFormCRUD) => {
    console.log('Success:', values);

    setLoading(true);
    const response = await updateOrderStatus({ orderCode: data?.code || '', updateType: values.updateType }, OrderType.SALE_ORDER);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      handleOk(response.data);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal title={`Thông tin đơn hàng`}
      visible={true} width={700}
      onOk={() => onSubmit()}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} loading={loading} >
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => onSubmit()}>
          Xác nhận
        </Button>,
      ]}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="updateType" label="Trạng thái" rules={[{ required: true }]}>
          <Select
            placeholder="Chọn trạng thái"
          >
            {fastOrderStatusOption(data?.status || OrderStatus.PENDING).map(item => <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ShipperOrderListEdit