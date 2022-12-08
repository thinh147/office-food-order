import React from "react";
import "./index.scss";

const GuideLine = () => {
  return (
    <div className="guideline-wrapper">
        <div className="guideline-wrapper-content">
            <div className="guideline-text">
                HƯỚNG DẪN MUA HÀNG
            </div>
            <div className="guide-timeline">
                <div className="red-dot" />            
                <div className="red-arrow" />
                <div className="step" style={{left: 'calc(5%)'}}>
                    <div className="icon-step" >
                        <img src="https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png" alt="avatar" />
                    </div>
                    <div className="describe">
                    </div>
                </div>

                <div className="step" style={{left: 'calc(30%)'}}>
                    <div className="icon-step">
                        <img src="https://cdn.w600.comps.canstockphoto.com/edit-text-icon-simple-style-eps-vector_csp79314784.jpg" alt="avatar" />
                    </div>
                    <div className="describe">
                        Tạo đơn hàng
                    </div>
                </div>

                <div className="step" style={{left: 'calc(55%)'}}>
                    <div className="icon-step">
                        <img src="https://thumbs.dreamstime.com/b/money-bag-icon-moneybag-coins-flat-design-simple-cartoon-illustration-vector-174619420.jpg" alt="avatar" />
                    </div>
                    <div className="describe">
                        Thanh toán
                    </div>
                </div>

                <div className="step" style={{left: 'calc(80%)'}}>
                    <div className="icon-step">
                        <img src="https://cdn-icons-png.flaticon.com/512/264/264665.png" alt="avatar" />
                    </div>
                    <div className="describe">
                        Theo dõi đơn hàng <br/> Office Food ship hàng tận nơi
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default GuideLine;
