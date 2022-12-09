import { ORDER_STATUS_LABEL, PAYMENT_STATUS_LABEL } from '@core/constant/setting';
import { convertDateString } from '@core/helpers/converter';
import { OrderStatus, OrderType } from '@core/models/order';
import { PaymentStatus } from '@core/models/payment';
import { OrderChangeStatusOption } from '@core/models/serverRequest';
import { IOrderDetailItemResponse, IOrderDetailResponse, IOrderResponse } from "@core/models/serverResponse";
import { Button } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { AiFillEdit, AiFillPhone, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { VscNotebookTemplate } from 'react-icons/vsc';
import { v4 as uuid} from 'uuid';

export const columns = (
  onEdit: (data: IOrderResponse) => void,
  onTransactionHistory: (data: IOrderResponse) => void,
  openCart: (data: IOrderResponse) => void
): ColumnsType<IOrderResponse> => ([
  {
    title: 'STT',
    dataIndex: 'STT',
    key: 'STT',
    render: (value, record, index) => {
      return index + 1;
    }
  },
  {
    title: 'Tên khách hàng',
    key: 'CustomerName',
    render: (value: IOrderResponse, record, index) => {
      return <div>
        <span>{value.customerName || ''}</span>
      </div>
    }
  },
  {
    title: 'Số điện thoại',
    key: 'CustomerPhoneNumber',
    render: (value: IOrderResponse, record, index) => {
      return <div>
        <span>{value.customerPhone} </span>
      </div>
    }
  },
  {
    title: 'Địa chỉ',
    key: 'Address',
    width: 300,
    render: (value: IOrderResponse, record, index) => {
      return <div>
        <span>{value.customerAddress || ''}</span><br />
      </div>
    }
  },
  {
    title: 'Status',
    // dataIndex: 'Status',
    key: 'Status',
    render: (row: IOrderResponse) => {
      return <div>
        <span>{ORDER_STATUS_LABEL[row.status]}</span><br />
        {/* <span>{convertDateString(row.updatedAt, 'DD-MM-YYYY')}</span><br /> */}
      </div>
    }
  },
  {
    title: 'Tổng tiền',
    key: 'Total',
    render: (row: IOrderResponse) => {
      return <div>
        <span>Tiền hàng: {row.totalNetPrice}</span><br />
        {/* <span>Thuế: {row.totalVat}</span><br />
        <span>Tổng tiền: {row.finalPrice}</span><br />
        <span>Tạm ứng: {row.depositPrice}</span><br /> */}
        <span>{PAYMENT_STATUS_LABEL[row.paymentStatus || PaymentStatus.PENDING]}</span><br />
      </div>
    }
  },
  {
    title: 'Thao tác',
    key: 'Manipulation',
    render: (row: IOrderResponse) => {
      return <div>
        <Button type='link' onClick={() => onEdit(row)}>{ row.status === 1 ? 'Nhận đơn' : 'Xác nhận giao thành công'}</Button><br />
        {/* <Button type='link' onClick={() => openCart(row)}><AiOutlineShoppingCart /> Giỏ hàng</Button><br />
        {/* <Button type='link' onClick={() => }><BsFillTrashFill /> Xóa</Button> */}
        {/* <Button type='link' onClick={() => onTransactionHistory(row)}><VscNotebookTemplate /> Lịch sử giao dịch</Button> */} 
      </div>
    }
  },
])

export const fastOrderStatusOption = (currentStatus: OrderStatus) => {
  if (currentStatus === OrderStatus.PENDING) {
    return [
      { value: OrderChangeStatusOption.confirm, label: 'Xác nhận' },
      { value: OrderChangeStatusOption.reject, label: 'Từ chối' },
      { value: OrderChangeStatusOption.cancel, label: 'Hủy' }
    ]
  }
  return [
    { value: OrderChangeStatusOption.confirm, label: 'Xác nhận' },
    { value: OrderChangeStatusOption.changeStatus, label: 'Sang trạng thái tiếp theo' },
    { value: OrderChangeStatusOption.reject, label: 'Từ chối' },
    { value: OrderChangeStatusOption.cancel, label: 'Hủy' }
  ]
}

export const columnsCart: ColumnsType<IOrderDetailItemResponse> = [
  {
    title: 'STT',
    dataIndex: 'STT',
    key: 'STT',
    render: (value, record, index) => {
      return index + 1;
    }
  },
  {
    title: 'Thuộc tính',
    key: 'Customer',
    render: (value: any, record, index) => {
      return <div>
        <Button type='link'>{value.productUrl}</Button><br />
        <Button type='link'>{value.size}</Button><br />
        <Button type='link'>{value.color}</Button><br />
      </div>
    }
  },
  {
    title: 'Tổng tiền',
    key: 'Total',
    render: (row: any) => {
      return <div>
        <span>Tiền hàng: {row.totalNetPrice}</span><br />
        <span>Tổng tiền: {row.itemFinalPrice}</span><br />
        <span>Giảm giá: {row.discount}</span><br />
        <span>Tạm ứng: {row.depositAmount}({row.depositPercent}%)</span><br />
      </div>
    }
  },
  {
    title: 'Trạng thái',
    key: 'status',
    render: (row: IOrderDetailItemResponse) => {
      return <div>
        <span>{ORDER_STATUS_LABEL[row.status]}</span><br />
        <span>{convertDateString(row.updatedAt, 'DD-MM-YYYY')}</span><br />
      </div>
    }
  }
];

export const defaultData = [
  {
    customerName: 'Son',
    customerPhone: '08579123123',
    customerAddress: '85 Xuân Thủy, Cầu Giấy, Hà Nội',
    status: 1,
    totalNetPrice: 100000,
    // totalVat: 10000,
    // finalPrice: 110000,
    // depositPrice: 0,
    code: uuid(),
  },
  {
    customerName: 'Hong',
    customerPhone: '068924123123',
    customerAddress: '27 Thanh Xuân, Hà Nội',
    status: 1,
    totalNetPrice: 150000,
    // totalVat: 5000,
    // finalPrice: 160000,
    // depositPrice: 0,
    code: uuid(),
  }
]