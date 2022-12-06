import { Channel } from "@core/models/order";
import { IVoucherCRUD } from "@core/models/serverRequest";
import { IVoucherResponse } from "@core/models/serverResponse";
import { Button } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export const VOUCHER_FORM_DEFAULT: Partial<IVoucherCRUD> = {
  title: '',
  code: '',
  quantity: 0,
  quantityPerUser: 0,
  status: false,
  discount: 0,
  gender: 0,

  typeDiscount: 0,
  priceDiscountMax: 0,
  orderType: 0,
  channel: Channel.amazon
}
export const columns = (onDelete: (data: IVoucherResponse) => void, onEdit: (data: IVoucherResponse) => void) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Số lượng',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Tối thiểu',
    dataIndex: 'minimum',
    key: 'minimum',
  },
  {
    title: 'Giảm giá',
    dataIndex: 'discount',
    key: 'discount',
  },
  {
    title: 'Ngày',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: 'Áp dụng',
    dataIndex: 'apply',
    key: 'apply',
  },
  {
    title: 'Hành động',
    key: "provjp",
    render: (row: IVoucherResponse) => (
      <div className="d-flex gap-16">
        <Button type="primary" shape="circle" onClick={() => onEdit(row)} icon={<AiFillEdit />}></Button>
        <Button danger shape="circle" onClick={() => onDelete(row)} icon={<BsFillTrashFill />}></Button>
      </div>
    ),

  },
];