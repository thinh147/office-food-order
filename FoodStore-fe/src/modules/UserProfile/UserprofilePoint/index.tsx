import React from 'react'
import { Row, Col, Typography } from 'antd';


const { Text, Title } = Typography;

const UserprofilePoint = () => {

    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Điểm hiện tại của bạn là : 0 điểm</Title>
            </div>
            <div className='information'>
                <Row style={{ padding: '20px' }}>
                    <Col span={24}>
                        <div className="section_body">
                            <div><p dir="ltr"><strong>1.Về Hanaichi coin</strong></p>
                                <p dir="ltr">Hanaichi coin là một đơn vị điểm được quy đổi từ chi phí mua hàng của bạn tại Hanaichi.vn. Hanaichi coin được tích lũy thông qua quá trình mua hàng thường xuyên của bạn và chỉ sử dụng được trên sàn thương mại điện tử Hanaichi.vn.</p>
                                <p dir="ltr">Bạn có thể dùng Hanaichi coin để thanh toán trực tiếp cho đơn hàng tương tự như ví Hanaichi, Paypal, Visa, Mastercard,....</p>
                                <p dir="ltr"><strong>2.Hướng dẫn quy đổi Hanaichi coin</strong></p>
                                <p dir="ltr"><strong style={{color: '#ffa940'}} >&nbsp; &nbsp; &nbsp; &nbsp;1 coin = 1.000đ</strong></p>
                                <p dir="ltr"><strong>3.Các hình thức tích lũy Hanaichi coin</strong></p>
                                <ul>
                                    <li >
                                        <p dir="ltr">Tích lũy Hanaichi coin từ các lần mua hàng tại Hanaichi.vn: với mỗi đơn hàng mua tại Hanaichi.vn đều được hoàn coin bằng 1% giá trị đơn hàng. (Ví dụ: bạn mua đơn hàng trị giá 1.000.000đ, bạn sẽ tích được 10 coin, tương đương 10.000đ)</p>
                                    </li>
                                    <li>
                                        <p dir="ltr">Nhận Hanaichi coin từ các chương trình khuyến mãi dành cho khách hàng: tặng coin, hoàn coin lên đến 5%,....</p>
                                    </li>
                                </ul>
                                <p dir="ltr"><strong>4.Điều khoản sử dụng</strong></p>
                                <ul>
                                    <li dir="ltr">Bạn có thể sử dụng Hanaichi coin để thanh toán bất kỳ đơn hàng nào trên Hanaichi.vn.</li>
                                    <li dir="ltr">Hanaichi coin không thể rút vì bất kỳ lý do gì.</li>
                                    <li dir="ltr">Hanaichi coin sẽ được tích sau 10 ngày kể từ ngày đơn hàng của bạn được giao hàng thành công.</li>
                                </ul>
                                <p>Mọi thắc mắc về dịch vụ ưu đãi của Hanaichi, bạn vui lòng gọi điện tới số hotline 1900 292 995 để được hỗ trợ kịp thời.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default UserprofilePoint