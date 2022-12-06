import { CHANNEL_FORM, GENDER, MAP_GENDER_TO_NUMBER } from '@core/constant/form';
import { STATUS_CODE } from '@core/constant/setting';
import { normalizeFormNumber } from '@core/helpers/converter';
import { ModalProps } from '@core/models/config';
import { Channel, OrderType } from '@core/models/order';
import { IVoucherCRUD } from '@core/models/serverRequest';
import { IVoucherResponse } from '@core/models/serverResponse';
import { Gender } from '@core/models/user';
import { addVoucher } from '@services/voucherService';
import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Select } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { VOUCHER_FORM_DEFAULT } from '../config/voucher';

const AdminDiscountCU = ({ handleCancel, handleOk, data }: ModalProps<IVoucherCRUD, IVoucherResponse>) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState<Channel>(Channel.amazon);
  const typeDiscount = Form.useWatch('typeDiscount', form);

  useEffect(() => {
    if (data && data.channel) {
      setChannel(data.channel);
    }
  }, [data]);

  const formDefaultValue = useMemo(() => {
    if (!data) {
      return VOUCHER_FORM_DEFAULT;
    }
    const toFormData: Partial<IVoucherCRUD> = {
      ...VOUCHER_FORM_DEFAULT,
      ...data,
    };
    return toFormData;
  }, [data]);

  const onFinish = async (values: IVoucherCRUD) => {
    console.log('Success:', values);

    setLoading(true);
    values.userIds = [];
    values.startDate = (values.startDate as unknown as Moment).toISOString();
    values.endDate = (values.endDate as unknown as Moment).toISOString();
    values.gender = MAP_GENDER_TO_NUMBER[values.gender as unknown as Gender];
    if (data && data.id) {
      values.id = data.id;
    }
    const response = await addVoucher(values);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      handleOk(response.data);
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onSubmit = () => {
    form.submit();
  }
  const timeFormat = 'DD/MM/YYYY';
  const prefix = data ? 'Sửa' : 'Thêm';

  return (
    <Modal title={`${prefix} voucher`}
      visible={true} width={700}
      onOk={() => onSubmit()}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} loading={loading} >
          Quay lại
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => onSubmit()}>
          {prefix}
        </Button>,
      ]}>
      <Form
        form={form}
        layout="vertical"
        initialValues={data ? formDefaultValue : { channel: channel, gender: Gender.none, orderType: OrderType.SALE_ORDER }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: 'Tên voucher không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Code"
              name="code"
              rules={[{ required: true, message: 'Code voucher không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16} className="align-items-center mb-8">
          <Col span={12}>
            <Form.Item
              label="Số lượng"
              name="quantity"
              normalize={normalizeFormNumber}
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số lần một người được sử dụng"
              name="quantityPerUser"
              normalize={normalizeFormNumber}
              rules={[{
                required: true, message: 'Không được để trống',
              }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item initialValue={0}
              label="Loại giảm giá"
              name="typeDiscount">
              <Radio.Group >
                <Radio value={0}>Phần trăm</Radio>
                <Radio value={1}>Giá tiền cố định</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={typeDiscount === 0 ? [{ required: true, message: 'Không được để trống!' }] : undefined}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Số tiền được giảm giá"
              name="priceDiscountMax"
              rules={typeDiscount === 1 ? [{ required: true, message: 'Không được để trống!' }] : undefined}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              initialValue={0}
              label="Trạng thái"
              name="status">
              <Radio.Group>
                <Radio value={0}>Tắt</Radio>
                <Radio value={1}>Bật</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Ngày bắt đầu"
              name="startDate">
              <DatePicker format={timeFormat} disabledDate={(current) => {
                return current && current > form.getFieldValue("endDate") || current.isBefore(moment().subtract(1, 'day'));
              }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Ngày kết thúc"
              name="endDate">
              <DatePicker format={timeFormat} disabledDate={(current) => {
                return current && current < form.getFieldValue("startDate") || current.isBefore(moment().subtract(1, 'day'));
              }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AdminDiscountCU