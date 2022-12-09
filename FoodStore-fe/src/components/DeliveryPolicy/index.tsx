import React from "react";
import './index.scss';

const DeliveryPolicy = () => {
  return(
		<div className="payment-policy-container">
			<div className="infomation">
				<h3 className="title-page">CHÍNH SÁCH GIAO NHẬN HÀNG</h3>

			</div>
			<p className="heading">1. Phạm vi áp dụng</p>
			Phạm vi áp dụng: trong nội thành Thành phố Hà Nội
			<br />
			<p className="heading">2. Thời gian giao – nhận hàng</p>
			– Đơn hàng cơm sẽ được giao trong vòng 30 phút kể từ khi xác nhận đơn hàng đã được thanh toán hoặc được admin xác nhận được phép giao hàng
			<br />
			– Thời gian giao hàng được tính từ lúc hoàn tất thủ tục đặt hàng với nhân viên tư vấn đến khi nhận được hàng.			
		</div>
		
	)
};

export default DeliveryPolicy;
