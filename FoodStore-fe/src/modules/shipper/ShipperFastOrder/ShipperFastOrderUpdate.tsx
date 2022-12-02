import { STATUS_CODE } from '@core/constant/setting'
import { ModalProps } from '@core/models/config'
import { IFastOrderDetail, IOrderFormCRUD, OrderStatus, OrderType } from '@core/models/order'
import { IOrderDetailResponse, IOrderResponse } from '@core/models/serverResponse'
import { fetchFastOrderDetail, updateOrderStatus } from '@services/orderService'
import { Button, Col, Form, Modal, Row, Select, Table } from 'antd'
import { useEffect, useState } from 'react'
import { fastOrderStatusOption } from '../../admin/config/fastOrder'

const ShipperFastOrderUpdate = ({ data, handleCancel, handleOk }: ModalProps<IOrderResponse, OrderStatus>) => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState({} as IFastOrderDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetchFastOrderDetail(data?.code || '');
      if (response.code === STATUS_CODE.SUCCESS) {
        setDetail(response.data);
        form.setFieldsValue({
          orderCode: response.data.code,
          updateType: response.data.status
        });
      }
    })()
  }, [])

  const onSubmit = () => {
    form.submit();
  }

  const onFinish = async (values: IOrderFormCRUD) => {
    console.log('Success:', values);

    setLoading(true);
    const response = await updateOrderStatus({ orderCode: data?.code || '', updateType: values.updateType }, OrderType.FAST_ORDER);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      handleOk(response.data);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Modal title={`Fast order`}
      visible={true} width={700}
      onOk={() => onSubmit()}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} loading={loading} >
          Quay lại
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => onSubmit()}>
          update
        </Button>,
      ]}>
      {/* <Row gutter={16}>
        <Col span={8}> */}
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
      {/* </Col>
      </Row> */}
    </Modal>
  )
}

export default ShipperFastOrderUpdate