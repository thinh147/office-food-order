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
  onEdit: (data: IOrderResponse) => void
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
        <span>{value.address || ''}</span><br />
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
      </div>
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
    title: 'Tổng tiền',
    key: 'Total',
    render: (row: IOrderResponse) => {
      return <div>
        <span>Tiền hàng: {row.finalPrice}</span><br />
        <span>{PAYMENT_STATUS_LABEL[row.paymentStatus || PaymentStatus.PENDING]}</span><br />
      </div>
    }
  },
  {
    title: 'Thao tác',
    key: 'Manipulation',
    render: (row: IOrderResponse) => {
      return <div>
        <Button type='link' onClick={() => onEdit(row)}>{ row.status === 12 ? 'Nhận đơn' : 'Xác nhận giao thành công'}</Button><br />
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