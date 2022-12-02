import { Modal, Skeleton } from "antd";
import React, { useState, lazy, Suspense } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartDetailFooter from "./CartDetailFooter";
import "./index.scss";

const CartDetail = lazy(() => import("./CartDetail"));

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* <ShoppingCartOutlined style={{ fontSize: '32px', color: '#fff' }} className="pointer" onClick={() => setShowModal(true)} /> */}
      <MdOutlineShoppingCart
        style={{ fontSize: "32px", color: "#fff" }}
        className="pointer"
        onClick={() => setShowModal(true)}
      />
      <Modal
        centered
        visible={showModal}
        closable={true}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={
          <CartDetailFooter
            setShowModal={setShowModal}
          />
        }
        bodyStyle={{ height: 530, }}
        zIndex={1002}
        width={1050}
        keyboard={true}
      >
        <Suspense fallback={<Skeleton />}>
          <CartDetail setShowModal={setShowModal} />
        </Suspense>
      </Modal>
    </>
  );
};

export default Cart;
