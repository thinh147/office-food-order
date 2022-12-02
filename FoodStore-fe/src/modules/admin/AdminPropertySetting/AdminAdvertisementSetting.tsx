import { useAdvertisementSetting } from '@context/propertyContext/config';
import { STATUS_CODE } from '@core/constant/setting';
import { IAdvertisementSetting } from '@core/models/config';
import { getAdvertisementSetting, updateAdvertisementSetting } from '@services/propertyService';
import { Button, Col, Form, Input, message, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
interface IFormInitialValue {
  section1: { url: string }[];
  section2: { url: string }[];
  section3: { url: string }[];
  id: number;
}
type IFormInitialValueSubmit = Omit<IFormInitialValue, 'id'>;
const AdminAdvertisementSetting = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const advertisement = useAdvertisementSetting();

  useEffect(() => {
    const { id, ...section } = advertisement;
    const formData = Object.entries(section)
      .reduce((acc, [key, value]) =>
        ({ ...acc, [key]: value.map((url: string) => ({ url: url })) }), {} as IFormInitialValue);
    form.setFieldsValue(formData);
  }, [advertisement])


  const onFinish = async (params: IFormInitialValueSubmit) => {
    const request = {
      id: advertisement.id
    } as IAdvertisementSetting;
    (Object.keys(params) as (keyof IFormInitialValueSubmit)[])
      .forEach(key => request[key] = params[key].map((item: { url: any; }) => item.url));

    setLoading(true);
    const response = await updateAdvertisementSetting(request);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      message.success('Cập nhật thành công');
    } else {
      message.error('Cập nhật thất bại');
    }
  }
  const onFailed = (error: any) => {
    console.log(error);
  }
  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFailed} >
      <Row gutter={8}>
        <Col span={12}>
          <span>Khu vực A</span>
          <Form.List name="section1">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline" >
                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      rules={[{ required: true, message: 'Khong được bỏ trống' }]}
                      style={{ width: '100%' }}
                    >
                      <Input placeholder="https://image.com" />
                    </Form.Item>
                    <AiOutlineMinusCircle onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<AiOutlinePlus />}>
                    Thêm ảnh khu vực A
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
        <Col span={12}>
          <span>Khu vực B</span>
          <Form.List name="section2">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      rules={[{ required: true, message: 'Khong được bỏ trống' }]}
                    >
                      <Input placeholder="https://image.com" />
                    </Form.Item>
                    <AiOutlineMinusCircle onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<AiOutlinePlus />}>
                    Thêm ảnh khu vực B
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
        <Col span={12}>
          <span>Khu Vực C</span>
          <Form.List name="section3">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      rules={[{ required: true, message: 'Khong được bỏ trống' }]}
                    >
                      <Input placeholder="https://image.com" />
                    </Form.Item>
                    <AiOutlineMinusCircle onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<AiOutlinePlus />}>
                    Thêm ảnh khu vực A
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AdminAdvertisementSetting