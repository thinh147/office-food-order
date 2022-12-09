import React from "react";
import './index.scss';

const DeliveryPolicy = () => {
  return(
		<div className="payment-policy-container">
            <h3 className="title">Thông tin của chúng tôi:</h3>
            <div className="infomation">
                <div className="content">
                    <strong>Office Food - Ship đồ ăn nhanh văn phòng</strong>
                    <p><strong>Địa chỉ: </strong>102 Thái Thịnh, Trung Liệt, Đống Đa, Hà Nội</p>
                    <p><strong>Điện thoại: </strong> 094 195 8899</p>
                    <p><strong>Email: </strong> info@officefood.com.vn</p>
                    <div className="user">
                        <p>Nguyễn Thị Hồng</p>
                        <p>Giám Đốc - 0912 34 56 78</p>
                        <p>hongnguyen@officefood.com.vn</p>
                    </div>
                </div>
                <div className="map">
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
            </div>
            
		</div>
		
	)
};

export default DeliveryPolicy;
