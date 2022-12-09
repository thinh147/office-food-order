import { Row, Col, Typography } from "antd";
import logo from "../../../logo.png";
import React from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";
import { MdOutlineHomeWork, AiOutlineMail, FiPhoneCall } from "react-icons/all";
import "./index.module.scss";

const { Text, Paragraph } = Typography;

const LayoutHomepageFooter = () => {
  return (
    <div className={style["container"]}>
      <div className={style["top"]}>
        <div className={style["top__inner"]}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className={style["gutter-row"]} span={8}>
              <Paragraph>
                <Text strong>Về chúng tôi</Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link className="text-link-footer" to={"/about-us"}>
                    Giới thiệu
                  </Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link
                    className="text-link-footer"
                    to={"/information-privacy-policy"}
                  >
                    Chính sách bảo mật thông tin
                  </Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link className="text-link-footer" to={"/payment-policy"}>
                    Chính sách thanh toán
                  </Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link className="text-link-footer" to={"/delivery-policy"}>
                    Chính sách giao nhận hàng
                  </Link>
                </Text>
              </Paragraph>
            </Col>
            <Col className={style["gutter-row"]} span={8}>
              <Paragraph>
                <Text strong>Office Food - Ship đồ ăn văn phòng</Text>
              </Paragraph>
              <Paragraph>
                <Text>Chứng nhận kinh doanh số 123455677</Text>
              </Paragraph>
              <Paragraph>
                <MdOutlineHomeWork />
                <Text style={{ marginLeft: "20px" }}>
                  Trụ sở:
                  <br />
                  Cơ sở 1: 102 Thái Thịnh – 094 195 8899
                  <br />
                  Cơ sở 2: D17 Làng Quốc tế Thăng Long (số 3 Nguyễn Đỗ Cung –
                  ngõ 76 Nguyễn Phong Sắc cũ) – 094 165 3399
                  <br />
                  Cơ sở 3: B52 Nguyễn Thị Định, Thanh Xuân – 094 165 8899
                </Text>
              </Paragraph>
              <Paragraph>
                <AiOutlineMail />
                <Text style={{ marginLeft: "20px" }}>
                  Email: info@officefood.com.vn
                </Text>
              </Paragraph>
              <Paragraph>
                <FiPhoneCall />
                <Text style={{ marginLeft: "20px" }}>
                  Số điện thoại: 0941239121 - 0345678123
                </Text>
              </Paragraph>
            </Col>
            <Col className={style["gutter-row"]} span={8}>
              <div style={{ width: "70%", float: 'right' }}>
                <iframe
                  width="100%"
                  height="300"
                  frameBorder="0"
                  scrolling="no"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=102%20P.%20Th%C3%A1i%20Th%E1%BB%8Bnh,%20Th%E1%BB%8Bnh%20Quang,%20%C4%90%E1%BB%91ng%20%C4%90a,%20H%C3%A0%20N%E1%BB%99i,%20Vi%E1%BB%87t%20Nam+(Office%20Food%20-%20Ship%20%C4%91%E1%BB%93%20%C4%83n%20v%C4%83n%20ph%C3%B2ng)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.maps.ie/distance-area-calculator.html">
                    measure acres/hectares on map
                  </a>
                </iframe>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={style["bottom"]} >
        <span>All Right Reserved. Office Food Store.</span>
      </div>
    </div>
  );
};

export default LayoutHomepageFooter;
