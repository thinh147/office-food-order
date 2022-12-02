import React from "react";
import "./index.scss";

import { ImTicket } from "react-icons/im";
import { GoPackage } from "react-icons/go";
import { FaMedal } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const Guarantee = () => {
  return (
    <div className="guarantee-wrapper">
      <div className="guarantee-wrapper-content">
        <div className="guarantee-wrapper-item">
          <div className="left">
            <ImTicket className="icon" />
          </div>
          <div className="right">GIÁ TỐT <br /> NHẤT THỊ TRƯỜNG</div>
        </div>
        <div className="guarantee-wrapper-item">
          <div className="left">
            <GoPackage className="icon" />
          </div>
          <div className="right">BẢO HIỂM <br /> HÀNG HÓA 100%</div>
        </div>
        <div className="guarantee-wrapper-item">
          <div className="left">
            <FaMedal className="icon" />
          </div>
          <div className="right">HÀNG CHÍNH HÃNG <br /> 100%</div>
        </div>
        <div className="guarantee-wrapper-item">
          <div className="left">
            <ImTicket className="icon" />
          </div>
          <div className="right">PHÍ DỊCH VỤ 0Đ</div>
        </div>
        <div className="guarantee-wrapper-item">
          <div className="left">
            <BsSearch className="icon" />
          </div>
          <div className="right">TRA CỨU ĐƠN HÀNG <br /> DỄ DÀNG</div>
        </div>
      </div>
    </div>
  );
};

export default Guarantee;
