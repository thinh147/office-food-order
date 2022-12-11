import { ORDER_STATUS_LABEL } from '@core/constant/setting';
import { CurrencyWithCommas } from '@core/helpers/converter';
import { OrderStatus } from '@core/models/order';
import { IOrderResponse } from '@core/models/serverResponse';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react'
import { PhoneOutlined } from '@ant-design/icons';
interface Props {
  orders: IOrderResponse[];
}

const OrderRequestTable = ({ orders }: Props) => {

  const columns: ColumnsType<IOrderResponse> = [
    {
      title: 'STT',
      key: 'stt',
      render: (row: IOrderResponse, record: IOrderResponse, index: number) => index + 1
    },
    {
      title: 'Mã đơn hàng',
      key: 'orderCode',
      render: (row: IOrderResponse) => (
        <>
          <p className='m-0'>{row.orderCode}</p>
        </>
      ),
    },
    
    {
      title: 'Customer',
      key: 'customer',
      render: (row: IOrderResponse) => (
        <>
          <p className="m-0">Tên: {row.customerName}</p>
          <p className="m-0"><PhoneOutlined />Số điện thoại: {row.customerPhone} </p>
        </>
      ),
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      render: (row: IOrderResponse) => (
        <>
          <p className="m-0">Địa chỉ {row.address} </p>
        </>
      ),
      width: 200,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => ORDER_STATUS_LABEL[status]
    },
    {
      title: 'Tiền',
      key: 'price',
      render: (row: IOrderResponse) => {
        return (
          <>
            <p className="m-0">Tổng tiền: <b>{CurrencyWithCommas(row.finalPrice, 'đ')} </b></p>
          </>
        )
      }
    }
  ];
  return (
    <Table dataSource={orders} columns={columns} rowKey={(row) => row.code} />
  )
}

export default OrderRequestTable