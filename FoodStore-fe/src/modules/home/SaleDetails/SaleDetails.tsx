import React from "react";
import { Row, Col } from "antd";
import './index.scss'

const SaleDetails = () => {
  return (
    <div className="sale-details-wrapper">
      <div className="sale-details-content">
        <div className="sale-details-content-inner">
          <div className="inner-banner">SIÊU SALE CHÍNH HÃNG</div>

          <div className="inner-down-content">
            <Row>
              <Col xs={24} xl={12}>
                <div className="inner-down-content-item">
                  <div className="top">
                    <p>SẢN PHẨM BÁN CHẠY</p>
                    <a>Xem`{"Thêm>"}` </a>
                  </div>
                  <div className="down">
                    <div className="down-item">
                      <div className="discounted">
                        <div className="percent">50%</div>
                        <p>GIẢM</p>
                      </div>
                      <div className="img-wrapper">
                        <img
                          src="https://topshare.vn/wp-content/uploads/2021/02/Hinh-anh-cho-che-hai-8.jpg"
                          alt=""
                        />
                      </div>
                      <div className="price-total">₫20.0000</div>
                    </div>
                    <div className="down-item">
                      <div className="discounted">
                        <div className="percent">50%</div>
                        <p>GIẢM</p>
                      </div>
                      <div className="img-wrapper">
                        <img
                          src="https://anhdep123.com/wp-content/uploads/2020/05/h%C3%ACnh-%E1%BA%A3nh-con-ch%C3%B3.jpg"
                          alt=""
                        />
                      </div>
                      <div className="price-total">₫20.0000</div>
                    </div>
                    <div className="down-item">
                      <div className="discounted">
                        <div className="percent">50%</div>
                        <p>GIẢM</p>
                      </div>
                      <div className="img-wrapper">
                        <img
                          src="https://topshare.vn/wp-content/uploads/2021/02/Hinh-anh-cho-che-hai-8.jpg"
                          alt=""
                        />
                      </div>
                      <div className="price-total">₫20.0000</div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} xl={12}>
                <div className="inner-down-content-item">
                  <div className="top">
                    <p>THƯƠNG HIỆU NỔI BẬT</p>
                    <a>Xem`{"Thêm>"}` </a>
                  </div>
                  <div className="down">
                    <div className="down-item">
                      <div className="discounted">
                        <div className="percent">50%</div>
                        <p>GIẢM</p>
                      </div>
                      <div className="img-wrapper">
                        <img
                          src="https://topshare.vn/wp-content/uploads/2021/02/Hinh-anh-cho-che-hai-8.jpg"
                          alt=""
                        />
                      </div>
                      <div className="price-total">GIẢM ĐẾN 50%</div>
                    </div>
                    <div className="down-item">
                      <div className="discounted">
                        <div className="percent">50%</div>
                        <p>GIẢM</p>
                      </div>
                      <div className="img-wrapper">
                        <img
                          src="https://anhdep123.com/wp-content/uploads/2020/05/h%C3%ACnh-%E1%BA%A3nh-con-ch%C3%B3.jpg"
                          alt=""
                        />
                      </div>
                      <div className="price-total">GIẢM ĐẾN 50%</div>
                    </div>
                    {/* <div className="down-item">
                      <div className="discounted">
                        <div className="percent">50%</div>
                        <p>GIẢM</p>
                      </div>
                      <div className="img-wrapper">
                        <img
                          src="https://topshare.vn/wp-content/uploads/2021/02/Hinh-anh-cho-che-hai-8.jpg"
                          alt=""
                        />
                      </div>
                      <div className="price-total">GIẢM ĐẾN 20%</div>
                    </div> */}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetails;
