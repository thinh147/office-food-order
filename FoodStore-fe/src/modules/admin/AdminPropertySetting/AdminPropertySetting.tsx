import { usePropertyContext } from '@context';
import { Button, Form, Input } from 'antd';
import AdminAdvertisementSetting from './AdminAdvertisementSetting';

const AdminPropertySetting = () => {
  const [form] = Form.useForm();
  const { saveProperty, property: settings } = usePropertyContext();

  return (
    <>
      <Form
        layout="inline"
        form={form}
        initialValues={settings}
        onFinish={() => saveProperty(form.getFieldsValue())}
      >
        <Form.Item label="VAT" name="vatPercent" rules={[{ required: true, message: 'Thuế không được trống' }]}>
          <Input type="number" placeholder="nhập thuế giá trị gia tăng" />
        </Form.Item>
        <Form.Item label="Phí vận chuyển" name="shipFee" rules={[{ required: true, message: 'Phí vận chuyển không được trống' }]}>
          <Input type="number" placeholder='phí vận chuyển' />
        </Form.Item>
        <Form.Item label="Tỉ giá trao đổi" name="exchangeRate" rules={[{ required: true, message: 'Tỉ giá được trống' }]}>
          <Input type="number" placeholder='VND -> Yên' />
        </Form.Item>
        <Button htmlType="submit">Lưu</Button>
      </Form>
      <AdminAdvertisementSetting></AdminAdvertisementSetting>
    </>
  )
}

export default AdminPropertySetting