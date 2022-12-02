import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
interface ICartDetail {
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  destination?: string;
}


const CartDetail = ({ setShowModal, destination }: ICartDetail) => {
  return (
    <>
      <Button type="primary" onClick={() => setShowModal && setShowModal(false)} size="large"
        icon={<BsCartPlus style={{ fontSize: "16px", marginRight: "5px" }} />}>
        <Link to={destination || '/order'}>
          <span className="text-white">Tiến hành đặt hàng</span>
        </Link>
      </Button>
    </>
  );
};

export default CartDetail;
