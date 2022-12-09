import CartDetailFooter from '@components/cart/CartDetailFooter';
import { useCartContext } from '@context';
import { MIN_DEPOSIT_ALL } from '@core/constant/setting';
import { CurrencyWithCommas } from '@core/helpers/converter';
import { Button, Col, Modal, Radio, RadioChangeEvent, Row, Space } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { BiGift } from 'react-icons/bi';
import { getVoucher } from '@services/voucherService';
import '../index.scss';
import { IVoucherResponse } from '@core/models/serverResponse';

import voucherImge from '../../../../assets/image/voucher.png';

const OrderConfirmationComputePrice = () => {
  const { cartInfo } = useCartContext();
  const { totalPriceVnd, totalPriceYen } = cartInfo;
  const [depositPercent, setDepositPercent] = useState(100);
  const [isShowModal, setIsShowModal] = useState(false);
  const [listVouchers, setListVouchers] = useState<IVoucherResponse[]>([]);
  const [voucherActive, setVoucherActive] = useState<number>(0);
  const [voucherChoosen, setVoucherChoosen] = useState<number>(0);

  useEffect(() => {
    const getListVoucher = async () => {
      const res = await getVoucher();
      if (res) {
        setListVouchers(res.data.elements);
      }
    };
    getListVoucher();
  }, []);

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setDepositPercent(value);
  };

  const optionsWithDisabled = useMemo(() => ([
    { label: `30% - ${CurrencyWithCommas(totalPriceVnd * 0.3)}đ`, value: 30, disabled: MIN_DEPOSIT_ALL <= totalPriceVnd },
    { label: `50% - ${CurrencyWithCommas(totalPriceVnd * 0.5)}đ`, value: 50, disabled: MIN_DEPOSIT_ALL <= totalPriceVnd },
    { label: `100% - ${CurrencyWithCommas(totalPriceVnd)}đ`, value: 100 },
  ]), [totalPriceVnd]);

  const handleCloseModal = () => {
    setVoucherActive(0);
    setIsShowModal(false);
  };

  const handleChooseVoucher = () => {
    setVoucherChoosen(voucherActive);
    setIsShowModal(false);
  }

  const getDiscountPrice = () => {
    const currentPrice = Number(totalPriceVnd);
    const index = listVouchers.findIndex((item) => item.id === voucherChoosen);
    if (index > -1) {
      const discount = listVouchers[index].discount;
      const priceDiscount = currentPrice * discount / 1000;
      return priceDiscount;
    }
    return 0;
  }

  return (
    <>
      <div className="summary">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={0} xl={8} />
          <Col className="gutter-row" xs={24} xl={16}>
            <p className='voucher-selection' onClick={() => setIsShowModal(true)}><BiGift className="icon" />Chọn mã giảm giá</p>
            {
              voucherChoosen !== 0 &&
              <div className='voucher-choosen'>
                <p>Một mã giảm giá đã được lựa chọn</p>
                <p onClick={() => setVoucherChoosen(0)}>Xóa</p>
              </div>
            }
            <div className="wrapper">
              <div
                className="summary-right"
                style={{ alignSelf: "center" }}
              >
                <h3>Tạm tính</h3>
              </div>
              <div className="summary-left">
                <p>{CurrencyWithCommas(totalPriceVnd)} đ </p>
              </div>
            </div>
            <div className="wrapper">
              <div className="summary-right">
                <h3>Giảm giá</h3>
              </div>
              <div className="summary-left">
                <h4>{CurrencyWithCommas(getDiscountPrice())}đ</h4>
              </div>
            </div>
            <div className="wrapper">
              <div className="summary-right">
                <h3>Tổng số tiền cần thanh toán</h3>
              </div>
              <div className="summary-left">
                <h4>{CurrencyWithCommas(totalPriceVnd - getDiscountPrice())}đ</h4>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <CartDetailFooter destination={`/order/address`} />
      </div>
      <Modal
        centered
        visible={isShowModal}
        title="Chọn mã giảm giá"
        closable={true}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={
          <div>
            <Button onClick={handleCloseModal}>Đóng</Button>
            <Button disabled={voucherActive === 0} onClick={handleChooseVoucher}>Chọn</Button>
          </div>
          
        }
        bodyStyle={{ height: 530, }}
        zIndex={1002}
        width={1050}
        keyboard={true}
      >
        {
          listVouchers.map((item, index) => (
            <div 
              className={`voucher-item ${voucherActive === item.id ? 'voucher-active' : ''}`} 
              key={index} 
              onClick={() => setVoucherActive(item.id)}
            >
              <img src={voucherImge} alt="voucher" className='voucher-image'/>
              <div className='voucher-card'>
                <p>{item.title || 'voucher-title'}</p>
                {
                  item.discount && <p>Giảm tới {item.discount}%</p>
                }
                <p>HSD: 15/12/2022</p>
              </div>
            </div>
          ))
        }
      </Modal>
    </>
  )
}

export default OrderConfirmationComputePrice