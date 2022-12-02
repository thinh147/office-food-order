import { ORDER_STATUS_LABEL, PAYMENT_STATUS_LABEL } from '@core/constant/setting';
import { CurrencyWithCommas } from '@core/helpers/converter';
import { OrderStatus } from '@core/models/order';
import { PaymentStatus } from '@core/models/payment';
import { IOrderResponse } from '@core/models/serverResponse'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom';

interface Props {
  orders: IOrderResponse[];
}

const OrderChannelTable = ({ orders }: Props) => {
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
          <p className='m-0'>{row.code}</p>
          <p className='m-0'>{moment(row.orderDate).format('DD-MM-YYYY hh:mm:ss')}</p>
        </>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => ORDER_STATUS_LABEL[status]
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (data: number) => CurrencyWithCommas(data)
    },
    {
      title: 'Tiền đặt cọc',
      dataIndex: 'deposit',
      key: 'deposit'
    }, {
      title: 'Đã chuyển',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (data: PaymentStatus) => data ? PAYMENT_STATUS_LABEL[data] : PAYMENT_STATUS_LABEL[PaymentStatus.PENDING]
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (row: IOrderResponse) => row.paymentStatus && row.paymentStatus !== PaymentStatus.PENDING ? <AiOutlineShoppingCart /> : <Link to={`/order/payment/${row.code}`}>Ứng tiền</Link>
    }
  ];
  return (
    <Table dataSource={orders} columns={columns} rowKey={(row) => row.code} />
  )
}

export default OrderChannelTable