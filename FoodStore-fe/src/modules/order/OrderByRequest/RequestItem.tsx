import { CHANNEL_DROPDOWN } from "@core/constant/form";
import {
  CurrencyWithCommas, normalizeNumberForm
} from "@core/helpers/converter";
import { Channel } from "@core/models/order";
import { IFastOrderItem } from "@core/models/serverRequest";
import { AutoComplete, Col, Form, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";

interface IRequestItemProps {
  handleUpdateRequestItem: (values: IFastOrderItem, index: number) => void;
  itemRequest: IFastOrderItem;
  index: number;
  isSubmit: boolean
}


let isFirst = true;


const RequestItem = ({
  handleUpdateRequestItem,
  itemRequest,
  index,
}: IRequestItemProps) => {
  const [form] = Form.useForm<IFastOrderItem>();
  const [options, setOptions] = useState(CHANNEL_DROPDOWN);

  useEffect(() => {
    form.setFieldsValue({ ...itemRequest });
  }, []);

  useEffect(() => {
    if (isFirst) {
      isFirst = false;
      return;
    }
    form.validateFields();
  }, [itemRequest])

  // useEffect(() => {
  //   if (isSubmit) {
  //     form.submit();
  //   }
  // }, [isSubmit, form]);

  const updateForm = async () => {
    try {
      const value = await form.validateFields();
      value.isValidate = true;
      handleUpdateRequestItem(value, index);

    } catch (error: any) {
      // not validate
      if (error.values) {
        const value = error.values as IFastOrderItem;
        value.isValidate = false;
        handleUpdateRequestItem(value, index);
      }
    }

  }

  const onSubmitSuccess = (value: IFastOrderItem) => {
    console.log('submit');
    value.isValidate = true;
    handleUpdateRequestItem(value, index);
  }

  const onSubmitFailed = () => {
    console.log('failed')
    const value = form.getFieldsValue(true);
    value.isValidate = false;
    handleUpdateRequestItem(value, index);
  }
  const onSelect = (value: string) => {
    handleUpdateRequestItem({
      ...form.getFieldsValue(),
      channelName: value
    }, index);
  };
  const handleSearch = (value: string) => {
    setOptions(CHANNEL_DROPDOWN.filter(item => item.value.includes(value.toLowerCase())));
  };
  return (
    <Form form={form} onBlur={updateForm} onFinish={onSubmitSuccess} onFinishFailed={onSubmitFailed}>
      <Row>
        <Col span={6}>
          <Form.Item
            label="Th????ng hi???u:"
            name="channelName"
            rules={[{ required: true, message: 'Xin h??y nh???p t??n th????ng hi???u' }]}
          >
            <AutoComplete options={options}
              style={{ width: 200 }}
              onSelect={onSelect}
              onSearch={handleSearch}>
              <Input />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>
      <Typography.Text strong>Thu???c t??nh s???n ph???m</Typography.Text>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Link s???n ph???m:"
            name="productUrl"
            rules={[{ required: true, message: 'Xin h??y nh???p t??n th????ng hi???u' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Form.Item
            label="Nh???p m??u s???c"
            name="color"
            rules={[{ required: true, message: 'Xin h??y nh???p m??u s???c!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}></Col>
        <Col span={10}>
          <Form.Item
            label="Nh???p k??ch th?????c"
            name="size"
            rules={[{ required: true, message: 'Xin h??y nh???p k??ch th?????c!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Form.Item
            label="S??? l?????ng"
            name="quantity"
            normalize={normalizeNumberForm}
            rules={[{ required: true, message: 'Xin h??y nh???p s??? l?????ng!' }, {
              validator: (_, store: string) => {
                return new Promise((resolve, reject) => +store > 0 ? resolve(+store) : reject());
              }, message: 'S??? l?????ng ??t nh???t l?? 1'
            }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={4}></Col>
        <Col span={10}>
          <Form.Item
            label="Gi?? y??n"
            name="yenPrice"
            normalize={normalizeNumberForm}
            rules={[{ required: true, message: 'Xin h??y nh???p gi?? ti???n!' }, {
              validator: (_, store: string) => {
                return new Promise((resolve, reject) => +store > 1 ? resolve(+store) : reject());
              }, message: 'S??? l?????ng ??t nh???t l?? 1'
            }]}
          >
            <Input prefix="??" type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Typography.Paragraph>Th??nh ti???n(VN??): <Typography.Text strong>{CurrencyWithCommas(itemRequest.finalPrice || 0, '??')}</Typography.Text></Typography.Paragraph>
      </Row>
    </Form>
  );
};

export default RequestItem;
