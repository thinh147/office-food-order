import { Col, Row, Table, Typography } from 'antd';
import React from 'react';
import './index.scss';


const { Text, Title } = Typography;

const UserprofileCollaborators = () => {
    const columns = [
        {
            title: 'Phân loại đại lí',
            dataIndex: '1',
        },
        {
            title: 'Khối lượng giao dịch *',
            dataIndex: '2',

        },
        {
            title: 'Chiết khẩu tỉ giá*',
            dataIndex: '3',

        },
        {
            title: 'Cước vận chuyển Nhật-Việt',
            dataIndex: '4',
        },
    ];

    const data = [
        {
            1: 'Đại lí cấp 1 - đồng',
            2: 'trên 30.000.000vnd/1 tháng',
            3: 'Giảm 3 yên',
            4: '240.000đ/1kg',
        },

        {
            1: 'Đại lí cấp 2 - bạc',
            2: 'trên 60.000.000vnd/1 tháng',
            3: 'Giảm 5 yên',
            4: '235.000đ/1kg',
        },

        {
            1: 'Đại lí cấp 3 - vàng',
            2: 'trên 60.000.000vnd/1 tháng',
            3: 'Giảm 7 yên',
            4: '230.000đ/1kg',
        },

        {
            1: 'Đại lí cấp 4 - kim cương',
            2: 'trên 150.000.000vnd/1 tháng',
            3: 'Giảm 10 yên',
            4: '220.000đ/1kg',
        },

    ];
    return (
        <div>
            <div className='half-circle'>
            </div>
            <div className='title'>
                <Title level={5}>Hạng cộng tác viên</Title>
            </div>
            <div className='information'>
                <Row style={{ padding: '20px' }}>
                    <Col span={24}>
                        <div className="section_body">
                            <p>Chúc mừng bạn đã là CTV của Hanaichi, Hiện Hạng CTV của bạn là : <strong></strong></p>
                            <p>Hanaichi hiện đã có chính sách riêng dành cho đại lý/cộng tác viên mua hàng thường xuyên với số lượng lớn cố định hàng tháng.</p>
                            <p><strong>MỤC 1: CỘNG TÁC VIÊN HÀNG ORDER - ĐẶT HÀNG TRÊN CÁC WEBSITE TẠI NHẬT</strong></p>
                            <p>Khi khối lượng giao dịch tích lũy đạt 10.000.000đ, bạn sẽ đủ điều kiện để trở thành CTV của Hanaichi. Vui lòng đăng kí để trở thành CTV của Hanaichi tại <a href="https://hanaichi.vn/profile/dangkyctv" rel="noopener noreferrer" target="_blank"><strong>đây</strong></a><strong>&nbsp;</strong></p>
                            <p>Để duy trì Hạng đại lý và hưởng ưu đãi dành riêng, CTV cần đạt khối lượng giao dịch trong 1 tháng quy định tại bảng sau:</p>
                            <Table className='tableCollaborators' columns={columns} dataSource={data} bordered pagination={false} />
                            <p>* Chiết khấu tỉ giá: là phần giảm tỉ giá tương ứng so với tỉ giá hiện tại dành cho khách hàng thông thường.</p>
                            <p>Ví dụ: Tỉ giá hiện tại dành cho khách hàng thông thường là 245 thì tỉ giá đặt hàng dành cho đại lí cấp 1 là 242, đại lí cấp 2 là 240, đại lí cấp 3 là 238, đại lí cấp 4 là 235</p>
                            <p>* Khối lượng giao dịch được tính là khối lượng giao dịch tích lũy trong 1 tháng.&nbsp;</p>
                            <p><strong><em>Lưu ý đối với CTV hàng ORDER - đặt hàng trên các Website của Nhật:</em></strong></p>
                            <ul>
                                <li>CTV hàng ORDER đặt hàng duy nhất tại <a data-fr-linked="true" href="https://hanaichi.vn/">https://hanaichi.vn</a>. Vui lòng mở tài khoản tại <a href="https://hanaichi.vn/Account/Login-v2">đây</a> nếu bạn chưa có tài khoản trên website <a data-fr-linked="true" href="https://hanaichi.vn/">https://hanaichi.vn</a></li>
                                <li>Đại lí/CTV khi đặt hàng ORDER đều cần chuyển khoản tạm ứng tối thiểu 70% giá trị đơn hàng khi đặt hàng</li>
                                <li>Hàng về Việt Nam sau 2-3 tuần, kể từ ngày đặt hàng. Bạn không thể thay đổi/hủy đơn hàng sau khi đã xác nhận đặt hàng</li>
                                <li>Hạng đại lí/CTV được xét duyệt lại vào mùng 5 hàng tháng. Hanaichi sẽ tổng kết khối lượng giao dịch của từng cộng tác viên trong tháng trước đó để tiến hành nâng/hạ hạng tương ứng</li>
                                <li>Vui lòng tham khảo thêm về <a href="https://hanaichi.vn/helpcenter/topic-list/huong-dan-mua-hang" rel="noopener noreferrer" target="_blank">hướng dẫn đặt hàng</a> và <a href="https://hanaichi.vn/helpcenter/topic-list/tra-hang" rel="noopener noreferrer" target="_blank">chính sách đổi trả hàng</a> tại Hanaichi</li>
                            </ul>
                            <p><strong>MỤC 2: CỘNG TÁC VIÊN HÀNG CÓ SẴN TẠI SIÊU THỊ HANAICHI STORE</strong></p>
                            <p>Đặt hàng trên 5.000.000đ với 01 đơn hàng có sẵn, bạn sẽ đủ điều kiện để xét hạng đại lí và nhận được ưu đãi giá dành riêng cho CTV/đại lí</p>
                            <p>Vui lòng liên hệ ZALO 0932225560 hoặc facebook @vietnam.hanaichi hoặc số điện thoại 0932225560 để nhận được mức giá tốt nhất với số lượng áp dụng cho từng mặt hàng</p>
                            <p><strong><em>Lưu ý đối với CTV hàng có sẵn tại Siêu thị Hanaichi Store:</em></strong></p>
                            <ul>
                                <li>CTV hàng CÓ SẴN đặt hàng tại ZALO số 0932225560 hoặc facebook @vietnam.hanaichi hoặc số điện thoại 0932225560</li>
                                <li>Để nhận được giá ưu đãi đặc biệt, CTV cần duy trì đặt hàng có sẵn trên 10.000.000vnd/1 tháng. Hanaichi sẽ tổng kết khối lượng giao dịch của từng cộng tác viên vào mùng 5 hàng tháng</li>
                                <li>Đối với khách hàng thanh toán chuyển khoản trước, Hanaichi sẽ giao hàng sau 1-2 tiếng kể từ khi nhận được đơn hàng (trừ chiều thứ 7 và CN). Đối với khách hàng thanh toán khi nhận hàng (COD), Hanaichi sẽ giao hàng trong vòng 24 tiếng kể từ khi nhận đơn hàng</li>
                                <li>Hình thức thanh toán khi nhận hàng (COD) chỉ áp dụng với khách hàng có địa chỉ tại nội thành Hà Nội</li>
                                <li>Vui lòng tham khảo thêm <a href="https://hanaichi.vn/helpcenter/topic-item/chinh-sach-doi-tra-hang-mua-truc-tiep-tai-hanaichi-store" rel="noopener noreferrer" target="_blank">chính sách bảo hành/đổi trả</a> đối với hàng có sẵn tại siêu thị Hanaichi</li>
                            </ul>
                            <p>Hanaichi Việt Nam trân trọng cảm ơn sự quan tâm của các quý khách hàng và rất mong nhận được thêm nhiều sự ủng hộ hơn nữa của các khách có nhu cầu bán hàng Nhật nội địa chính hãng</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default UserprofileCollaborators