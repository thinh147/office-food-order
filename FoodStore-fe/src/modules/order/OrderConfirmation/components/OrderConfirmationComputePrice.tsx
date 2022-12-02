import CartDetailFooter from '@components/cart/CartDetailFooter';
import { useCartContext } from '@context';
import { MIN_DEPOSIT_ALL } from '@core/constant/setting';
import { CurrencyWithCommas } from '@core/helpers/converter';
import { Col, Radio, RadioChangeEvent, Row, Space } from 'antd';
import React, { useMemo, useState } from 'react';
import '../index.scss';

const OrderConfirmationComputePrice = () => {
  const { cartInfo } = useCartContext();
  const { totalPriceVnd, totalPriceYen } = cartInfo;
  const [depositPercent, setDepositPercent] = useState(100);

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setDepositPercent(value);
  };

  const optionsWithDisabled = useMemo(() => ([
    { label: `30% - ${CurrencyWithCommas(totalPriceVnd * 0.3)}đ`, value: 30, disabled: MIN_DEPOSIT_ALL <= totalPriceVnd },
    { label: `50% - ${CurrencyWithCommas(totalPriceVnd * 0.5)}đ`, value: 50, disabled: MIN_DEPOSIT_ALL <= totalPriceVnd },
    { label: `100% - ${CurrencyWithCommas(totalPriceVnd)}đ`, value: 100 },
  ]), [totalPriceVnd]);

  return (
    <>
      <div className="summary">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={0} xl={8} />
          <Col className="gutter-row" xs={24} xl={16}>
            {/* <div className="wrapper">
            <div className="summary-right">
              <h3>Phí vận chuyển nội địa nhật</h3>
            </div>
            <div className="summary-left">
              <h4>Đang cập nhật</h4>
            </div>
          </div>
          <div className="wrapper">
            <div className="summary-right">
              <h3>Phí vận chuyển Nhật - Việt</h3>
            </div>
            <div className="summary-left">
              <h4>Đang cập nhật</h4>
            </div>
          </div>
          <div className="wrapper">
            <div className="summary-right">
              <h3>Phụ phí</h3>
            </div>
            <div className="summary-left">
              <h4>Đang cập nhật</h4>
            </div>
          </div> */}
            <div className="wrapper">
              <div
                className="summary-right"
                style={{ alignSelf: "center" }}
              >
                <h3>Tạm tính</h3>
              </div>
              <div className="summary-left">
                <h4>
                  {CurrencyWithCommas(totalPriceYen)} ¥
                </h4>
                <p>{CurrencyWithCommas(totalPriceVnd)} đ </p>
              </div>
            </div>
            <div className="wrapper">
              <div className="summary-right">
                <h3>Giảm giá</h3>
              </div>
              <div className="summary-left">
                <h4>0 đ</h4>
              </div>
            </div>
            {/* <div className="wrapper">
              <div className="summary-right">
                <h3>Số tiền tạm ứng</h3>
              </div>
              <div className="summary-left">
                <Radio.Group onChange={onChange} value={depositPercent} optionType="button"
                  buttonStyle="solid">
                  <Space direction='vertical'>
                    {optionsWithDisabled.map(({ label, value, disabled }) =>
                      (<Radio.Button key={value} value={value} disabled={disabled}>{label}</Radio.Button>)
                    )
                    }
                  </Space>
                </Radio.Group>
              </div>
            </div> */}
            {/* <div className="coin-remain">local
                    <h3>Hiện bạn đang có 0 coin tương ứng 0 vnđ </h3>
                  </div> */}
          </Col>
        </Row>
      </div>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <CartDetailFooter destination={`/order/address`} />
      </div>
    </>
  )
}

export default OrderConfirmationComputePrice