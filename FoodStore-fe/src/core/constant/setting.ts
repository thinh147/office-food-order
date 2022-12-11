import { OrderStatus } from "@core/models/order";
import { PaymentStatus } from "@core/models/payment";

const PREFIX = import.meta.env.VITE_ALIAS;

const STORAGE_KEY = {
  TOKEN: `${PREFIX}_jwt_token`,
  REFRESH_TOKEN: `${PREFIX}_jwt_refresh_token`,
  USER_INFO: `${PREFIX}_user_info`,
  CATEGORIES: `${PREFIX}_categories`,
  FAST_ORDER: `${PREFIX}_fast_order_item`
}

const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_AUTHORIZED: 401,
  REQUEST_FAILED: -1000,
  INTERNAL_SERVER: 500
}

const METADATA_VALUE = {
  'size': Array.from({ length: 35 }).map((value, index) => ({ value: index + 28, label: `${index + 28}` }))
}

const MIN_DEPOSIT_ALL = 5000000;

const ORDER_STATUS_LABEL = {
  [OrderStatus.ALL]: 'Tất cả',
  [OrderStatus.PENDING]: "Đang chờ xử lý",
  [OrderStatus.BUYING]: "Đang tiến hành mua",
  [OrderStatus.BUYING_COMPLETED]: "Mua hàng thành công",
  [OrderStatus.DELIVERING_VN]: "Vận chuyển về Việt Nam",
  [OrderStatus.DELIVERING]: "Đang vận chuyển",
  [OrderStatus.DELIVERED]: "Đang tìm shipper",
  [OrderStatus.COMPLETED]: "Hoàn thành",
  [OrderStatus.CANCELED]: "Đã hủy"
}

const PAYMENT_STATUS_LABEL = {
  [PaymentStatus.CONFIRMED]: "Đã nhận",
  [PaymentStatus.PENDING]: "Chưa nhận",
  [PaymentStatus.SUCCESS]: "Chuyển thành công",
  [PaymentStatus.FAILED]: "Chuyển thất bại",
  [PaymentStatus.REJECTED]: "Từ chối"
}

export {
  STORAGE_KEY,
  STATUS_CODE,
  METADATA_VALUE,
  MIN_DEPOSIT_ALL,
  ORDER_STATUS_LABEL,
  PAYMENT_STATUS_LABEL
};
