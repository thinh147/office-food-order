import React from 'react'
import { FaShoppingCart, FaMoneyCheckAlt, FaCartPlus, FaPlane, FaTruck, FaPeopleCarry } from 'react-icons/fa';
import './index.scss';

interface IOrderStatus {
  status: number;
}
const OrderStatus = ({ status }: IOrderStatus) => {
  const getClassNameForStep = (order: number): string => {
    if (order < status) return "step active";
    if (order === status) return "step active doing";
    return "step";
  };

  return (
    <>
      {status && (
        <div className="wrapper-progress">
          <div className="progress" />
          <div
            className="progress-active"
            style={{ width: `${status < 7 ? status * 14 + 7 : 100}%` }}
          />

          <div className={getClassNameForStep(1)}>
            <div className="wrapper-icon">
              <FaShoppingCart className="icon" />
            </div>
            <p>Tạo đơn hàng</p>
          </div>
          {/* <div className={getClassNameForStep(2)}>
            <div className="wrapper-icon">
              <FaMoneyCheckAlt className="icon" />
            </div>
            <p>Chờ tạm ứng</p>
          </div> */}
          <div className={getClassNameForStep(3)}>
            <div className="wrapper-icon">
              <FaCartPlus className="icon" />
            </div>
            <p>Đang đặt hàng</p>
          </div>
          <div className={getClassNameForStep(4)}>
            <div className="wrapper-icon">
              <FaPlane className="icon" />
            </div>
            <p>Đã đặt hàng</p>
          </div>
          {/* <div className={getClassNameForStep(5)}>
            <div className="wrapper-icon">
              <FaMoneyCheckAlt className="icon" />
            </div>
            <p>Thanh toán</p>
          </div> */}
          <div className={getClassNameForStep(6)}>
            <div className="wrapper-icon">
              <FaTruck className="icon" />
            </div>
            <p>Giao hàng</p>
          </div>
          <div className={getClassNameForStep(7)}>
            <div className="wrapper-icon">
              <FaPeopleCarry className="icon" />
            </div>
            <p>Thành công</p>
          </div>
        </div>
      )}
    </>
  );
};


export default OrderStatus