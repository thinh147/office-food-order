import { usePropertyContext } from '@context';
import { ORDER_STATUS_LABEL, STATUS_CODE } from '@core/constant/setting';
import { CurrencyWithCommas } from '@core/helpers/converter';
import { IOrderDetailResponse } from '@core/models/serverResponse';
import { fetchOrderDetail } from '@services/orderService';
import { Button, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderStatus from '../OrderStatus';
import './index.scss';

const OrderTracking = () => {
  const { orderId } = useParams();
  const { property } = usePropertyContext();
  const [orderDetail, setOrderDetail] = useState({} as IOrderDetailResponse);

  useEffect(() => {
    if (orderId) {
      (async () => {
        const response = await fetchOrderDetail(orderId);
        if (response.code === STATUS_CODE.SUCCESS) {
          setOrderDetail(response.data);
        }
      })()
    }
  }, [orderId]);

  if (!orderDetail.code) return <Skeleton />

  const items = orderDetail.itemDetail.elements;

  const { address, userPhone, userEmail } = orderDetail;

  return (
    <>
      <OrderStatus status={2} />
      <div className="wrapper-tracking">
        <div className="order-detail">
          <h3>ĐƠN HÀNG</h3>
          <div className="group-detail">
            <span className="id-order">
              Mã đơn hàng: <span className="id-code">{orderId}</span>
            </span>
            <span className="id-order">
              Ngày đặt: <span className="id-code">2022-05-14 16:43:13</span>
            </span>
            <span className="id-order">
              Trạng thái: <span className="id-code">{ORDER_STATUS_LABEL[orderDetail.status]}</span>
            </span>
          </div>
          <div className="product-list">
            <div className="header">
              <div className="name-product">
                <h4>Tên sản phẩm</h4>
              </div>
              <div className="quality">
                <h4>Số lượng</h4>
              </div>
              <div className="price-per-one">
                <h4>Đơn giá</h4>
              </div>
              <div className="ship">
                <h4>V/c Nhật → Việt</h4>
              </div>
              <div className="ship">
                <h4>V/c nội địa Nhật </h4>
              </div>
              <div className="ship">
                <h4>Phụ phí</h4>
              </div>
              <div className="total-cost">
                <h4>Tổng tiền</h4>
              </div>
            </div>
            {items.map((item, index) => (
              <div className="product-list-body" key={`${item.id}_${index}`}>
                <div className="name-product">
                  <div className="image-wrapper">
                    <img src={item.productImage} alt={item.productName} />
                  </div>
                  <div className="title">
                    <h5>{item.productName}</h5>
                    {/* <h5>{item.description}</h5> */}
                  </div>
                </div>
                <div className="quality">
                  <h4>{item.quantity}</h4>
                </div>
                <div className="price-per-one">
                  <h4>{CurrencyWithCommas(item.itemFinalPrice / property.exchangeRate)} ¥</h4>
                  <p>{CurrencyWithCommas(item.itemFinalPrice)} đ</p>
                </div>
                <div className="ship">
                  <p>Đang cập nhật</p>
                </div>
                <div className="ship">
                  <p>Đang cập nhật</p>
                </div>
                <div className="ship">
                  <p>Đang cập nhật</p>
                </div>
                <div className="total-cost">
                  <p>
                    {CurrencyWithCommas(item.itemFinalPrice * item.quantity)} đ
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="total-cost-summary">
            <div className="total-need-pay">
              <h5>TỔNG GIÁ TRỊ ĐƠN HÀNG</h5>
              <h3>{CurrencyWithCommas(orderDetail.finalPrice)} đ</h3>
            </div>
            <div className="total-need-prepay">
              <h5>TỔNG SỐ TIỀN CẦN TẠM ỨNG</h5>
              {orderDetail.depositPrice ?
                <p>{CurrencyWithCommas(orderDetail.depositPrice)} đ</p>
                : <p>Bạn phải tạm ứng để đơn hàn được tiếp tục thực hiện </p>}
            </div>
          </div>
          <div className="address-delivery">
            <h5>THÔNG TIN GIAO HÀNG</h5>
            <div className="address">
              <div className="header">
                <p className="name">Họ và tên</p>
                <p className="name">Địa chỉ</p>
              </div>
              <div className="body">
                <p className="name">
                  {userEmail} ({userPhone})
                </p>
                <p className="name">
                  {address}
                </p>
              </div>
            </div>
          </div>
          {!orderDetail.depositPrice && <div className="control-order">
            <Link to={`/order/payment/${orderDetail.code}`}> <Button className="pre-pay text-white m-0" style={{ boxSizing: 'content-box' }}>Tạm ứng</Button></Link>
            {/* <div className="cancel ml-8">Hủy</div> */}
          </div>}
        </div>
      </div>
    </>
  );
}

export default OrderTracking