import { FileExcelOutlined, FileWordOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import { useState } from 'react';
import '../AdminFastOrder/index.scss';

interface DataType {
  key: number;
  information: string;
  status: number;
  transport: [];
  money: [];
  Manipulation: [];
}
const AdminOrderCollection = () => {
  const { Search } = Input;
  const [products, setProducts] = useState<DataType[]>([]);
  const columns = [
    {
      title: 'Thông tin',
      dataIndex: 'information',
      key: 'information',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Vận chuyển',
      dataIndex: 'transport',
      key: 'transport',
    },
    {
      title: 'Tiền',
      key: 'money',
      dataIndex: 'money',
    },
    {
      title: 'Thao tác',
      dataIndex: 'Manipulation',
      key: 'Manipulation',
    },
  ];
  const onSearch = (value: any) => {
    console.log(value)
  }
  return (
    <>
      <div className='mb-8'>
        <Row>
          <Col span={5} >
            <Search placeholder="code:...id:...:sđt:..." onSearch={onSearch} enterButton />
          </Col>
          <Col span={3} style={{ marginLeft: '10px' }}>
            <Input placeholder="---Tất cả---" />
          </Col>
          <Col span={3} style={{ marginLeft: '10px' }} >
            <Input placeholder="---Trạng thái---" />
          </Col>
          <Col span={3} style={{ marginLeft: '10px' }}  >
            <Input placeholder="---Vận chuyển---" />
          </Col>
          <Col span={3} style={{ marginLeft: '10px' }} >
            <Input placeholder="Chưa giao" />
          </Col>
          <Col span={3} style={{ marginLeft: '10px' }}>
            <Input placeholder="Tuần:..." />
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Button type='primary'> <FileExcelOutlined />Xuất excel</Button>
          <Button style={{ marginLeft: '10px' }} type='primary'><FileWordOutlined />A4</Button>
          <Button style={{ marginLeft: '10px' }} type='primary'><FileWordOutlined />A5</Button>
          <Button style={{ marginLeft: '10px' }} type='primary'><FileExcelOutlined />Chưa Gom</Button>
          <Button style={{ marginLeft: '10px' }} type='primary'>Cập nhật code</Button>
        </Row>
      </div>
      <Table rowSelection={{ type: 'checkbox', }} columns={columns} dataSource={products} pagination={{ position: ['bottomRight'] }} />
    </>
  )
}

export default AdminOrderCollection