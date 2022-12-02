import React from "react";
import { Row, Col } from "antd";
import { FaPhoneAlt } from "react-icons/fa";
import "./index.scss";
import { useNavigate } from "react-router-dom";

interface IHeaderProps {
  type_page: "Confirm Address" | "Confirm Payment" | "ThankYou";
}

const index = ({ type_page }: IHeaderProps) => {
  const navigation = useNavigate();
  return (
    <div className="controller-header">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} xl={7}>

            <div className="back" onClick={() => navigation(-1)}>
              <a>{"<"}Quay lại bước trước</a>
            </div>
       
        </Col>
        <Col className="gutter-row" xs={24} xl={10}>
          <div className="info-text">
            {type_page === "Confirm Address" && <h3>Thông tin nhận hàng</h3>}
            {type_page === "Confirm Payment" && <h3>Phương thức thanh toán</h3>}
            {type_page === "ThankYou" && <h3>TẠO ĐƠN HÀNG THÀNH CÔNG</h3>}
            <p>Cảm ơn bạn đã đã tin tưởng và sử dụng dịch vụ.</p>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} xl={7}>
          <div className="need-help">
            <p>Bạn cần hỗ trợ? Gọi ngay</p>
            <div className="phone">
              <FaPhoneAlt className="icon-phone" />
              <span className="phone-number"> 1900 292 995</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default index;
