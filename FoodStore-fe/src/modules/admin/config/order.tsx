import { PhoneOutlined } from '@ant-design/icons';
import { ORDER_STATUS_LABEL } from '@core/constant/setting';
import { CurrencyWithCommas } from "@core/helpers/converter";
import { OrderStatus } from "@core/models/order";
import { IOrderListRequest } from "@core/models/serverRequest";
import { IOrderResponse } from "@core/models/serverResponse";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AiFillEdit } from "react-icons/ai";

export const columns = (handleAcceptOrder: (data: IOrderResponse) => void, handleCancelOrder: (data: IOrderResponse) => void): ColumnsType<IOrderResponse> => [
  {
    title: 'STT',
    dataIndex: 'STT',
    key: 'STT',
    render: (value, record, index) => {
      return index + 1;
    },
    width: 80,
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
    title: 'Status',
    key: 'status',
    render: (row: IOrderResponse) => {
      return (
        <>
          <span>{ORDER_STATUS_LABEL[row.status]}</span><br />
        </>
      )
    }
  },
  {
    title: 'Code',
    key: 'orderCode',
    render: (row: IOrderResponse) => (
      <>
        <p className="m-0">{row?.orderCode || ''}</p>
      </>
    ),
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
    title: 'Action',
    key: 'action',
    render: (row: IOrderResponse) => {
      if(row.status === 1) {
        return (
          <div className="d-flex gap-16">
            <Button type="primary" onClick={() => handleAcceptOrder(row)}>Duyệt đơn</Button>
            <Button danger onClick={() => handleCancelOrder(row)}>Hủy đơn</Button>
          </div>
        );
      }
      return <></>
    }
  },
];

export const columnsShipper = (handleAcceptOrder: (data: IOrderResponse) => void, handleCancelOrder: (data: IOrderResponse) => void): ColumnsType<IOrderResponse> => [
  {
    title: 'STT',
    dataIndex: 'STT',
    key: 'STT',
    render: (value, record, index) => {
      return index + 1;
    },
    width: 80,
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
    title: 'Status',
    key: 'status',
    render: (row: IOrderResponse) => {
      return (
        <>
          <span>{ORDER_STATUS_LABEL[row.status]}</span><br />
        </>
      )
    }
  },
  {
    title: 'Code',
    key: 'orderCode',
    render: (row: IOrderResponse) => (
      <>
        <p className="m-0">{row?.orderCode || ''}</p>
      </>
    ),
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
    title: 'Action',
    key: 'action',
    render: (row: IOrderResponse) => {
      if(row.status === 11) {
        return (
          <div className="d-flex gap-16">
            <Button type="primary" onClick={() => handleAcceptOrder(row)}>Giao thành công</Button>
          </div>
        );
      }
      return <></>
    }
  },
];

export const columnsHistory = (): ColumnsType<IOrderResponse> => [
  {
    title: 'STT',
    dataIndex: 'STT',
    key: 'STT',
    render: (value, record, index) => {
      return index + 1;
    },
    width: 80,
  },
  {
    title: 'Customer',
    key: 'customer',
    render: (row: IOrderResponse) => (
      <>
        <p className="m-0">Tên: {row.customerName}</p>
        <p className="m-0"><PhoneOutlined />Số điện thoại {row.customerPhone} </p>
      </>
    ),
  },
  {
    title: 'Địa chỉ',
    key: 'address',
    render: (row: IOrderResponse) => (
      <>
        <p className="m-0"><PhoneOutlined />Địa chỉ {row.address} </p>
      </>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    render: (row: IOrderResponse) => {
      return (
        <>
          <span>{ORDER_STATUS_LABEL[row.status]}</span><br />
        </>
      )
    }
  },
  {
    title: 'Code',
    key: 'orderCode',
    render: (row: IOrderResponse) => (
      <>
        <p className="m-0">{row?.code || ''}</p>
      </>
    ),
  },
  {
    title: 'Tiền',
    key: 'price',
    render: (row: IOrderResponse) => {
      return (
        <>
          <p className="m-0">Tổng tiền: <b>{CurrencyWithCommas(row.totalNetPrice, 'đ')} </b></p>
        </>
      )
    }
  }
];


export const ORDER_FILTER_DEFAULT: IOrderListRequest = {
  orderDateFrom: '',
  key: '',
  orderStatus: OrderStatus.ALL,
  orderDateTo: '',
}