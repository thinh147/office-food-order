import React from "react";
import './index.scss'
import { Row, Col } from "antd";

const ClientFeedback = () => {
  return (
    <div className="feedback-wrapper">
      <div className="feedback-header">
        <h2>KHÁCH HÀNG ĐÁNH GÍA THẾ NÀO VỀ FastFood?</h2>
      </div>
      <div className="feedback-on-image">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{height : '100%'}}>
          <Col xs={24} xl={8}>
            <div className="wrapper-item-feedback" style={{backgroundImage :`url('https://media-cldnry.s-nbcnews.com/image/upload/t_focal-758x379,f_auto,q_auto:best/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg')` }}>
                
              <h3>GREEN EDITORIAL</h3>
              <p>Client: Herbal Magazine</p>
            </div>
          </Col>
          <Col xs={24} xl={8}>
            <div className="wrapper-item-feedback" style={{backgroundImage :`url('https://media-cldnry.s-nbcnews.com/image/upload/t_focal-758x379,f_auto,q_auto:best/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg')` }}>
              <h3>GREEN EDITORIAL</h3>
              <p>Client: Herbal Magazine</p>
            </div>
          </Col>
          <Col xs={24} xl={8}>
            <div className="wrapper-item-feedback" style={{backgroundImage :`url('https://media-cldnry.s-nbcnews.com/image/upload/t_focal-758x379,f_auto,q_auto:best/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg')` }}>
              <h3>GREEN EDITORIAL</h3>
              <p>Client: Herbal Magazine</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ClientFeedback;
