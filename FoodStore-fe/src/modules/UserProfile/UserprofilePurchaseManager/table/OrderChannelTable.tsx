import { ORDER_STATUS_LABEL, PAYMENT_STATUS_LABEL, STATUS_CODE } from '@core/constant/setting';
import { CurrencyWithCommas } from '@core/helpers/converter';
import { OrderStatus } from '@core/models/order';
import { PaymentStatus } from '@core/models/payment';
import { IOrderResponse } from '@core/models/serverResponse'
import { handleCancelOrderItem } from '@services/orderService';
import { Table } from 'antd';
import Button from 'antd/lib/button';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react'
import { message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

interface Props {
  orders: IOrderResponse[];
}

const OrderChannelTable = ({ orders }: Props) => {

  const handleCancelOrder = async (data: IOrderResponse) => {
    const res = await handleCancelOrderItem(data.orderCode);
    if(res.code === STATUS_CODE.SUCCESS) {
      message.success('Hủy đơn hàng thành công');
      // getOrders(filter);
    }
  };

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
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (row: IOrderResponse) => {
        if(row.status === 1) {
          return (
            <div className="d-flex gap-16">
              <Button type="primary" onClick={() => handleCancelOrder(row)}>Hủy đơn hàng</Button>
            </div>
          );
        }
        return <></>
      }
    }
  ];
  return (
    <Table dataSource={orders} columns={columns} rowKey={(row) => row.code} />
  )
}

export default OrderChannelTable