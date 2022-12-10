import HeaderOrder from '@components/HeaderOrder';
import React from 'react'
import { FaHome } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import './index.scss';

const OrderThanks = () => {
  const { orderId } = useParams();

  const navigation = useNavigate();

  return (
    <>
      <HeaderOrder type_page="ThankYou" />
      <div className="wrapper-order-thank">
        <p>
          Cảm ơn Quý khách đã gửi thông tin thanh toán cho đơn hàng. Đơn hàng
          của Quý khách sẽ được xác nhận thanh toán sau khi FastFood Shop nhận được
          thông báo từ Ngân hàng với nội dung thanh toán chính xác và đầy đủ
        </p>
        <p>
          Quý khách có thể theo dõi trạng thái đơn hàng tại
          <a> Trang cá nhân/Đơn hàng theo yêu cầu</a>{" "}
        </p>
        <p>Xin chân thành cảm ơn</p>
        <div className="group-button">
          <div className="button-home" onClick={() => navigation("/")}>
            <FaHome className="icon" />
            Trang chủ
          </div>
          <div
            className="button-manage-order"
            onClick={() => navigation(`/order/tracking/${orderId}`)}
          >
            Quản lí đơn hàng
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderThanks