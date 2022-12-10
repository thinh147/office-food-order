import { PhoneOutlined } from '@ant-design/icons';
import { ORDER_STATUS_LABEL } from '@core/constant/setting';
import { CurrencyWithCommas } from "@core/helpers/converter";
import { OrderStatus } from "@core/models/order";
import { IOrderListRequest } from "@core/models/serverRequest";
import { IOrderResponse } from "@core/models/serverResponse";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AiFillEdit, AiOutlineTransaction } from "react-icons/ai";
import { VscNotebookTemplate } from 'react-icons/vsc'

export const columns = (onEdit: (data: IOrderResponse) => void, onTransactionHistory: (data: IOrderResponse) => void, onOpenDetail: (data: IOrderResponse) => void): ColumnsType<IOrderResponse> => [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
    align: 'left',
    render: (id: number) => (
      <>
        <p className="m-0">{id}</p>
      </>
    ),
  },
  {
    title: 'Customer',
    key: 'customer',
    render: (row: IOrderResponse) => (
      <>
        <p className="m-0">{row.customerEmail} {row.customerName}</p>
        <p className="m-0"><PhoneOutlined />  {row.customerPhone} </p>
        <p className="m-0" style={{ color: 'red' }}> Cập nhật: Chưa có </p>
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
          <p className="m-0">{row.orderDate}</p>
        </>
      )
    }
  },
  {
    title: 'Code',
    key: 'code',
    dataIndex: 'code',
    render: (code: string) => (
      <>
        <p className="m-0">{code}</p>
      </>
    ),
  },
  {
    title: 'Tiền',
    key: 'price',
    render: (row: IOrderResponse) => {
      const mapStatus = (status: number) => {
        if (status != null) {
          return <p> Đã cọc</p>
        }
        else return <p style={{ color: '#9e9e9e' }}>Chưa cọc</p>
      }
      return (
        <>
          <p className="m-0">Tổng tiền: <b>{CurrencyWithCommas(row.totalPrice, 'đ')} </b>  Đặt cọc: <b>{row.depositPrice} </b> </p>
          {mapStatus(row.depositPrice)}
        </>
      )
    }
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (row: IOrderResponse) => (
      <div >
        <Button type='link' onClick={() => onEdit(row)} icon={<AiFillEdit />} > Sửa</Button><br />
        <Button type='link' onClick={() => onTransactionHistory(row)} icon={<AiOutlineTransaction />}> Lịch sử giao dịch</Button><br />
        <Button type='link' onClick={() => onOpenDetail(row)}><VscNotebookTemplate />Chi tiết đơn hàng</Button>
      </div>
    ),
  },
];


export const ORDER_FILTER_DEFAULT: IOrderListRequest = {
  orderDateFrom: '',
  key: '',
  orderStatus: OrderStatus.ALL,
  orderDateTo: '',
}