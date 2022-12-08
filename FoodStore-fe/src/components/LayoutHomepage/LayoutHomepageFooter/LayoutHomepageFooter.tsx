import { Row, Col, Typography } from 'antd'
import logo from '../../../logo.png';
import React from 'react'
import style from './index.module.scss'
import { Link } from 'react-router-dom';
import { MdOutlineHomeWork, AiOutlineMail, FiPhoneCall } from 'react-icons/all';
import './index.module.scss';

const { Text, Paragraph } = Typography;

const LayoutHomepageFooter = () => {
  return (
    <div className={style['container']}>
      <div className={style['top']}>
        <div className={style['top__inner']}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className={style["gutter-row"]} span={8}>
              <div className={style['logo']}>
                <img src={logo} alt="" />
              </div>
            </Col>
            <Col className={style["gutter-row"]} span={8}>
              <Paragraph>
                <Text strong>
                  Về chúng tôi
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link className='text-link-footer' to={'/about-us'}>Giới thiệu</Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link className='text-link-footer' to={'/information-privacy-policy'}>Chính sách bảo mật thông tin</Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link className='text-link-footer' to={'/payment-policy'}>Chính sách thanh toán</Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link className='text-link-footer' to={'/delivery-policy'}>Chính sách giao nhận hàng</Link>
                </Text>
              </Paragraph>
            </Col>
            <Col className={style["gutter-row"]} span={8}>
              <Paragraph>
                <Text strong>
                  Office Food - Ship đồ ăn văn phòng
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  Chứng nhận kinh doanh số 123455677
                </Text>
              </Paragraph>
              <Paragraph>
                <MdOutlineHomeWork />
                <Text style={{ marginLeft: '20px'}}>
                  Trụ sở: 11/22/33 đường Mỹ Đình, quận Nam Từ Liêm, Thành phố Hà Nội
                </Text>
              </Paragraph>
              <Paragraph>
                <AiOutlineMail />
                <Text style={{ marginLeft: '20px'}}>
                  Email:  info@officefood.com.vn
                </Text>
              </Paragraph>
              <Paragraph>
                <FiPhoneCall />
                <Text style={{ marginLeft: '20px'}}>
                  Số điện thoại: 0941239121 - 0345678123
                </Text>
              </Paragraph>
            </Col>
            {/* <Col className={style["gutter-row"]} span={6}>
              <div style={style}>col-6</div>
            </Col> */}
          </Row>
        </div>
      </div>
      <div className={style['bottom']} style={{backgroundColor:"fcdb99"}}>
        <span>All Right Reserved. Office Food Store.</span>
      </div>
    </div>
  )
}

export default LayoutHomepageFooter