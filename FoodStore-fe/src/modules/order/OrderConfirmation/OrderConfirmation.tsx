import { useCartContext } from '@context';
import { Button } from 'antd';
import React from 'react';
import { FaSadTear } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OrderStatus from '../OrderStatus';
import OrderCartItem from './components/OrderCartItem';
import OrderConfirmationComputePrice from './components/OrderConfirmationComputePrice';

const OrderConfirmation = () => {
  const { carts } = useCartContext();

  return (
    <div className='order-page'>
      {carts.length > 0 && (
        <div style={{ height: "100px" }}>
          <OrderStatus status={1} />
        </div>
      )}

      <div className="provider-cart-detail">
        {carts.length === 0 ? (
          <div className="wrapper-no-cart-item">
            <div className="wrapper-icon">
              <FaSadTear className="icon" />
            </div>
            <h2>Không tìm thấy sản phẩm</h2>
            <p>Xin lỗi, nhưng bạn chưa có sản phẩm nào trong giỏ hàng</p>

            <Button type="primary" size="large">
              <Link to={"/"}>Đặt đồ ăn cùng FastFood</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="title m-0">
              <div className="cart-title-left">
                <h3>Tên sản phẩm</h3>
              </div>
              <div className="cart-title-right">
                <div className="quality item">
                  <h3>Số lượng</h3>
                </div>
                <div className="price-per-one item">
                  <h3>Đơn giá</h3>
                </div>
                <div className="price-summary item">
                  <h3>Tổng tiền</h3>
                </div>
                <div className="price-summary white" />
              </div>
            </div>
            {carts.map((ele, index) => (
              <OrderCartItem cart={ele} key={`${ele.productId}_${index}`}></OrderCartItem>
            ))}
            <OrderConfirmationComputePrice></OrderConfirmationComputePrice>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderConfirmation