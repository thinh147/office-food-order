import { Row, Col, Typography } from 'antd'
import logo from '../../../logo.png';
import imgVp from '../../assets/image/VPBank logo-01.png';
import React from 'react'
import style from './index.module.scss'
import { Link } from 'react-router-dom';

const { Text, Paragraph } = Typography;

const LayoutHomepageFooter = () => {
  return (
    <div className={style['container']}>
      <div className={style['top']}>
        <div className={style['top__inner']}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className={style["gutter-row"]} span={8}>
              <div className={style['logo']}>
                {/* <img src={logo} alt="" /> */}
              </div>
              <Typography><Text strong>Hotline</Text>: <Text>9165481035</Text></Typography>
              <Typography><Text strong>Trụ sở</Text>: <Text>Số 38, ngõ 40 Tạ Quang Bửu, Hai Bà Trưng, Tp. Hà Nội
              </Text></Typography>
            </Col>
            <Col className={style["gutter-row"]} span={8}>
              <Paragraph>
                <Text strong>
                  Về chúng tôi
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link to={'/'}>Giới thiệu</Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link to={'/'}>Liên hệ</Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link to={'/'}>Chính sách </Link>
                </Text>
              </Paragraph>
            </Col>
            <Col className={style["gutter-row"]} span={8}>
              <Paragraph>
                <Text strong>
                  Dành cho khách hàng
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link to={'/'}>Tư vấn</Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link to={'/'}>Bảo mật</Link>
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>
                  <Link to={'/'}>Giới thiệu</Link>
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
        <span>All Right Reserved. FastFood Store.</span>
      </div>
    </div>
  )
}

export default LayoutHomepageFooter