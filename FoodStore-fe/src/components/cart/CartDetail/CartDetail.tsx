import { useCartContext } from "@context";
import { Button, Skeleton } from "antd";
import React, { useMemo } from "react";
import { FaSadTear } from "react-icons/fa";
import CartDetailItem from "../CartDetailItem";
import "./index.scss";

interface ICartDetailProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDetail = ({ setShowModal }: ICartDetailProps) => {

  const { carts, loading } = useCartContext();

  const list = useMemo(() => carts.map((ele) => (
    <CartDetailItem key={ele.cartId} {...ele} />
  )), [carts]);

  return (
    <>
      <div className="provider-cart-detail">
        {loading && carts.length === 0 && <Skeleton />}
        {carts.length === 0 ? (
          <div className="wrapper-no-cart-item">
            <div className="wrapper-icon">
              <FaSadTear className="icon" />
            </div>
            <h2>Không tìm thấy sản phẩm</h2>
            <p>Xin lỗi, nhưng bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Button
              type="primary"
              size="large"
              onClick={() => setShowModal(false)}
            >
              Mua sắm cùng FastFood
            </Button>
          </div>
        ) : (
          <div className="cart-body-wrapper">
            {list}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDetail;
