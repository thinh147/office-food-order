import React from 'react'
import { Row, Col, Typography } from 'antd';
import { Table } from 'antd';

const { Text, Title } = Typography;

const UserprofileRank = () => {
    const columns = [
        {
            title: 'Tính năng',
            dataIndex: '1',
        },
        {
            title: 'Mức độ',
            dataIndex: '2',

        },
    ];

    const data = [
        {
            1: 'Cấp độ',
            2: '1',
        },
        {
            1: 'Tên cấp độ',
            2: 'Hạng đồng',
        },

    ];
    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Cấp bậc của tôi</Title>
            </div>
            <div className='information'>
                <Row style={{ padding: '20px' }}>
                    <Col span={24}>
                        <div className="section_body">
                            <div className="my-3">
                                <strong>* Lưu ý</strong>
                                <br />
                                <Table columns={columns} dataSource={data} pagination={false} />

                                <ul>
                                    <li>Ưu đãi theo cấp độ thành viên dựa trên lịch sử giao dịch tích lũy chu kỳ 365 ngày, thứ hạng cấp độ thành viên có thể bị giảm nếu thành viên không đảm bảo duy trì hoạt động mua sắm đạt mức tích lũy theo quy định.</li>
                                    <li>Bạn có thể kiểm tra lịch sử giao dịch tích lũy và cấp độ thành viên của mình trên website và ứng dụng di động .</li>
                                    <li>Chi tiết xem <a href="https://hanaichi.vn/helpcenter/topic-item/quy-dinh-ve-tam-ung" className="color_orange">tạiđây</a>.
                                    </li>
                                </ul>
                            </div>
                            <div className="my-3">
                                <strong>* Thông tin hạng</strong>
                                <br />
                                <ul>
                                    <li>Hạng đồng: Tạm ứng tối thiếu 70% giá trị đơn hàng cho lần mua hàng đầu tiên</li>
                                    <li>Hạng bạc: Tạm ứng tối thiểu 50% cho đơn hàng ở lần mua tiếp theo</li>
                                    <li>Hạng vàng: Miễn tạm ứng với đơn hàng dưới 1 triệu. Với đơn hàng trên 1 triệu, tạm ứng 50%</li>
                                    <li>Hạng Bạch Kim: miễn tạm ứng với đơn hàng dưới 4 triệu. Với đơn hàng trên 4 triệu, tạm ứng 50%</li>
                                    <li>Hạng Kim Cương: miễn tạm ứng với TẤT CẢ các đơn hàng</li>
                                </ul>
                                <p>Trong đó, <strong>phân loại khách hàng</strong> được tính là:</p>
                                <ul>
                                    <li>Hạng đồng: chưa có giao dịch lần nào</li>
                                    <li>Hạng bạc: giao dịch thành công 1 lần</li>
                                    <li>Hạng vàng: giao dịch thành công 5 lần</li>
                                    <li>Hạng Bạch Kim: Xét duyệt dựa trên lịch sử thanh toán và doanh thu tích lũy của khách hàng</li>
                                    <li>Hạng Kim Cương: Xét duyệt dựa trên lịch sử thanh toán và doanh thu tích lũy của khách hàng</li>
                                </ul>
                                <p>&gt;&gt;&gt; Mọi thắc mắc về sản phẩm &amp; dịch vụ, quý khách vui lòng gọi điện tới số hotline: <strong>1900 292 995</strong> để được hỗ trợ kịp thời.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default UserprofileRank