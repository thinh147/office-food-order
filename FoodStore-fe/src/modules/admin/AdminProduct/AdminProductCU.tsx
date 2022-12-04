import useCategoriesContext from '@context/categoriesContext/config';
import { CHANNEL_FORM } from '@core/constant/form';
import { STATUS_CODE } from '@core/constant/setting';
import { normalizeFormNumber, parseJSON } from '@core/helpers/converter';
import { ModalProps } from '@core/models/config';
import { Channel, IProductMetaData, SuggestPropertyProduct } from '@core/models/order';
import { IProductResponse } from '@core/models/serverResponse';
import { addProduct, updateProduct, uploadImage } from '@services/productsService';
import { Button, Col, Form, Input, message, Modal, Row, Select, Upload, UploadProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlus, AiOutlineReload, AiOutlineUpload } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { CONFIGURATION_NAME_SUGGEST, IFormProductCRUD, PRODUCT_FORM_DEFAULT } from '../config/product';

const AdminProductCU = ({ handleCancel, handleOk, data }: ModalProps<IProductResponse>) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [showUploadImage, setShowUploadImage] = useState(data === null);
  const [channel, setChannel] = useState<string>("");
  const { getAllSubByChannelCategories, getMainCategories } = useCategoriesContext();

  useEffect(() => {
    if (data && data.channel) {
      setChannel(data.channel);
    }
  }, [data]);

  const categoriesSub = useMemo(() => getAllSubByChannelCategories(channel), [channel, getAllSubByChannelCategories]);
  const mainCategories = getMainCategories();

  const formDefaultValue = useMemo(() => {
    if (!data) {
      return PRODUCT_FORM_DEFAULT;
    }

    const toFormData: Partial<IFormProductCRUD> = {
      ...PRODUCT_FORM_DEFAULT,
      ...data,
      categoryId: data.subCategoryId,
      image: [{ originFileObj: data.imageUrl }],
      metaDataReqs: parseJSON(data.metaData, [] as IProductMetaData[])
    };
    // const {} = data;

    return toFormData;
  }, [data]);

  console.log('format default', formDefaultValue, data);

  const onFinish = async (values: IFormProductCRUD) => {
    console.log('Success:', values);

    setLoading(true);
    delete values?.channel;
    if (values.image && values.image.length && values.image[0].originFileObj instanceof File) {
      const url = await uploadImage(values.image[0].originFileObj);
      values.image = [{ originFileObj: url.data.url }];
    } else {
      values.image = [{ originFileObj: data?.imageUrl || '' }];
    }
    values.percentDiscount = values.percentDiscount || 0;
    const category = categoriesSub.find(category => category.id === +values.categoryId);
    if (category) {
      values.categoryName = category.title;
    }
    const api = data ? updateProduct.bind(null, data.id) : addProduct;
    const response = await api(values);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      handleOk(response.data);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e: any) => {
    console.log(e)
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSubmit = () => {
    form.submit();
  }

  const props: UploadProps = {
    listType: 'picture',
    maxCount: 1,
    beforeUpload: file => {
      const isPNG = file.type.includes('image/');
      if (!isPNG) {
        message.error(`${file.name} không phải là hình ảnh`);
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    // previewFile: file => {
    //   return Promise.resolve(URL.createObjectURL(file));
    // }
  };

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText ?
        []
        : CONFIGURATION_NAME_SUGGEST.filter(item => item.toLocaleLowerCase().includes(searchText.toLowerCase()))
          .map(item => ({ value: item })),
    );
  };

  const prefix = data ? 'Sửa' : 'Thêm';

  return (
    <Modal title={`${prefix} sản phẩm`}
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
        initialValues={data ? formDefaultValue : { channel: channel }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Tên sản phẩm ko được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thương hiệu"
              name="trademark"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Loại sản phẩm"
              name="channel">
              <Select placeholder="Chọn loại sản phẩm" onChange={(value) => setChannel(value)}>
                {mainCategories
                  .map((item, index) =>
                    (<Select.Option value={item.id} key={index}>{item.channel}</Select.Option>)
                  )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Sản phẩm"
              name="categoryId"
              rules={[{ required: true, message: 'Sản phẩm ko đc để trống!' }]}>
              <Select placeholder="Chọn sản phẩm">
                {categoriesSub
                  .map((category) =>
                    (<Select.Option value={category.id} key={`${category.id}_${Math.random() * 10 + 1}`}>{category.title}</Select.Option>)
                  )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="align-items-center mb-8">
          <Col span={12}>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              normalize={normalizeFormNumber}
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giảm giá"
              name="percentDiscount"
              normalize={normalizeFormNumber}
              rules={[{
                validator: (_, value) => {
                  if (value < 0) {
                    return Promise.reject(new Error('Giảm giá tối thiểu 0'));
                  }
                  if (value > 100) {
                    return Promise.reject(new Error('Giảm giá tối đa 100%'));
                  }
                  return Promise.resolve();
                }
              }]}
            >
              <Input type="number" min={0} max={100} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            {showUploadImage ?
              <Row gutter={8} className="align-items-center">
                <Col span={data ? 21 : 24}>
                  <Form.Item name="image" label="Hình Ảnh"
                    valuePropName="fileList" getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Ảnh không được để trống!' }]}>
                    <Upload {...props} className={!data ? "d-flex align-items-center gap-16" : ""}>
                      <Button icon={<AiOutlineUpload />}>Tải ảnh lên</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                {data && <Col span={3}>
                  <Button shape='circle' danger icon={<AiOutlineReload />}
                    onClick={() => setShowUploadImage(false)}></Button>
                </Col>}
              </Row>
              : data && <div className="d-flex justify-content-between aligns-item-center" style={{}}>
                <div style={{ width: '50px', height: '50px' }}>
                  <img src={data.imageUrl} style={{ width: '100%' }} alt="ảnh" />
                </div>
                <Button shape="circle" icon={<BsFillTrashFill />} onClick={() => setShowUploadImage(true)}></Button>
              </div>
            }
          </Col>

        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Link gốc sản phẩm"
              name="productUrl"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Link marketing"
              name="affiliateUrl"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.List name="metaDataReqs" rules={[{
              validator: async (rule, value) => {
                console.log(value)
                if (!value || value.length < 1) {
                  return Promise.reject(new Error('Ít nhất một thuộc tính phải được thêm'))
                }
                return Promise.resolve();
              }, message: 'Không đươc để trống!'
            }]}>
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...resField }) => (
                    <Row gutter={16} key={key}>
                      <Col span={0}>
                        <Form.Item {...resField} name={[name, 'configurationName']}>
                          <Input placeholder='Nhập thuộc tính' value={SuggestPropertyProduct.size_color} type={'hidden'} />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item {...resField} name={[name, 'options']}
                          rules={[{ required: true, message: 'Không đươc để trống!' }]}>
                          <Input placeholder="Nhập kích cỡ" />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item {...resField} name={[name, 'quantity']}
                          rules={[{ required: true, message: 'Không đươc để trống!' }]}>
                          <Input placeholder='Nhập Số lượng' type={'number'} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <AiOutlineMinusCircle onClick={() => remove(name)} fontSize={16} />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<AiOutlinePlus />}>
                      Thêm thuộc tính sản phẩm
                    </Button>
                  </Form.Item>
                  <Form.ErrorList errors={errors} />
                </>
              )}
            </Form.List>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: 'Please input Intro' }]}
            >
              <Input.TextArea showCount maxLength={1000} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AdminProductCU