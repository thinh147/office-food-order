import HeaderOrder from '@components/HeaderOrder';
import { IPaymentMethod } from '@core/common/interface';
import payment_method_data from '@core/common/payment-method';
import { MIN_DEPOSIT_ALL, STATUS_CODE } from '@core/constant/setting';
import { CurrencyWithCommas, orderDetailToPaymentInputRequest } from '@core/helpers/converter';
import { OrderType } from '@core/models/order';
import { IOrderDetailResponse } from '@core/models/serverResponse';
import { fetchOrderDetail } from '@services/orderService';
import { createPayment } from '@services/paymentService';
import { uploadImage } from '@services/productsService';
import { Button, Col, message, Radio, RadioChangeEvent, Row, Skeleton, Space, Upload, UploadProps } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useMemo, useState } from 'react';
import { FaImage, FaRegCopy, FaUniversity } from 'react-icons/fa';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './index.scss';

const Payment = () => {
  const { orderId } = useParams();

  const navigation = useNavigate();

  const [activePayment, setActivePayment] = useState<IPaymentMethod>(
    payment_method_data[0]
  );

  const [orderDetail, setOrderDetail] = useState({} as IOrderDetailResponse);

  const [depositPercent, setDepositPercent] = useState(100);

  const [imageUrl, setImageUrl] = useState<string>();

  const [paymentEvidence, setPaymentEvidence] = useState<File | Blob>();

  const [loading, setLoading] = useState(false);


  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setDepositPercent(value);
  };

  const finalPrice = orderDetail.finalPrice || 0;

  const optionsWithDisabled = useMemo(() => ([
    { label: `30% - ${CurrencyWithCommas(Math.ceil(finalPrice * 0.3))}đ`, value: 30, disabled: MIN_DEPOSIT_ALL <= finalPrice },
    { label: `50% - ${CurrencyWithCommas(Math.ceil(finalPrice * 0.5))}đ`, value: 50, disabled: MIN_DEPOSIT_ALL <= finalPrice },
    { label: `100% - ${CurrencyWithCommas(finalPrice)}đ`, value: 100 },
  ]), [finalPrice]);

  useEffect(() => {
    if (orderId) {
      (async () => {
        const query = new URLSearchParams(window.location.search);
        const type = query.get('orderType');
        const response = await fetchOrderDetail(orderId, type ? (type as unknown as OrderType) : OrderType.SALE_ORDER);
        if (response.code === STATUS_CODE.SUCCESS) {
          setOrderDetail(response.data);
        }
      })()
    }
  }, [orderId])

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type.includes('image');
    if (!isJpgOrPng) {
      message.error('Bạn chỉ được phép upload ảnh!');
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    setPaymentEvidence(file);
    return isJpgOrPng;
  };

  const handleConfirmPayment = async () => {
    if (!paymentEvidence) {
      message.error('Bạn phải up ảnh bằng chứng chuyển khoản')
      return;
    }
    setLoading(true);
    try {
      const upImageResponse = await uploadImage(paymentEvidence);

      if (upImageResponse.code !== STATUS_CODE.SUCCESS) {
        message.error('Upload ảnh thất bại, xin hay thử lại')
        throw new Error('failed upload image');
      }
      const { data: { url } } = upImageResponse;
      const prepaymentResposne = await createPayment({
        depositAmount: Math.ceil(finalPrice * depositPercent / 100),
        depositPercent: depositPercent,
        paymentImage: url,
        paymentInput: orderDetailToPaymentInputRequest(orderDetail)
      });

      if (prepaymentResposne.code === STATUS_CODE.SUCCESS) {
        message.success('Đặt cọc thành công!!!');
        navigation(`/order/thanks/${orderDetail.code}`);
      }
    } catch (error) {
      console.log('order failed', error);
    }
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('Copy thành công');
  }

  if (!orderDetail.code) return <Skeleton />

  const items = orderDetail.itemDetail.elements;

  const depositMoney = Math.ceil(finalPrice * depositPercent / 100);

  return (
    <>
      <HeaderOrder type_page="Confirm Payment" />
      <div className="wrapper-payment">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={24} xl={7}>
            <div className="payment-method-wrapper">
              <div className="method-item active">
                <div className="method-item-grip">
                  <span className="icon-wrapper">
                    <FaUniversity className="icon" />
                  </span>
                  <span className="type">Chuyển khoản ngân hàng</span>
                </div>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} xl={12}>
            <div className="wrapper-info-payment">
              <div className="note">
                <p className="content-note">
                  Quý khách cần tạm ứng cho đơn hàng{" "}
                  <span className="idOrder">{orderId}</span> tương đương với số
                  tiền :{" "}
                  <span className="price">
                    {CurrencyWithCommas(depositMoney)} đ
                  </span>{" "}
                  .
                </p>
              </div>
              <div className="select-bank">
                <div className="title">
                  <h5>Chọn ngân hàng thanh toán:</h5>
                </div>
                <div className="bank-list">
                  {payment_method_data.map((item) => (
                    <div
                      className={
                        item.id === activePayment.id ? "bank d-flex align-items-center active" : "bank d-flex align-items-center"
                      }
                      key={item.id}
                      onClick={() => setActivePayment(item)}
                    >
                      <img src={item.bank_image} alt="" />
                    </div>
                  ))}
                </div>
                <div className="title">
                  <h5>Bạn chọn ngân hàng:</h5>
                </div>
                <p className="picked-bank">{activePayment.bank_name}</p>
              </div>
              <div className="warning">
                <p className="title">Lưu ý</p>
                <p className="content">
                  - Quý khách vui lòng chọn chuyển tiền đến 1 trong những tài
                  khoản ngân hàng bên trên.
                </p>
                <p className="content">
                  - Quý khách cần chuyển tiền chính xác theo thông tin tài khoản
                  ngân hàng và nội dung chuyển khoản dưới đây.{" "}
                </p>
                <p className="content">
                  - Đơn hàng của Quý khách chỉ được xác nhận thanh toán sau khi
                  FastFood Shop nhận được thông báo từ Ngân hàng với nội dung thanh
                  toán chính xác và đầy đủ.{" "}
                </p>
                <p className="content">
                  - Đơn hàng được thanh toán tại máy ATM, vì không thể ghi chú
                  nội dung thanh toán nên Quý khách vui lòng thông báo qua
                  fanpage Facebook/Email hoặc gọi trực tiếp tổng đài FastFood Shop
                  để được hỗ trợ{" "}
                </p>
              </div>
              <div className="transfer-banking">
                <div className="title">
                  <h5>Thông tin chuyển khoản:</h5>
                </div>
                <div className="pre-pay-status">
                  <h3>
                    {CurrencyWithCommas(depositMoney)} đ
                  </h3>
                  <p>ĐANG CHỜ DUYỆT</p>
                </div>
                <div className="info">
                  <div className="info-left">
                    <h5>Ngân hàng</h5>
                  </div>
                  <div className="info-right">
                    <h5>{activePayment.bank_name}</h5>
                  </div>
                </div>
                <div className="info">
                  <div className="info-left">
                    <h5>Số tài khoản</h5>
                  </div>
                  <div className="info-right">
                    <h5>{activePayment.account_number}</h5>
                    <span>
                      <FaRegCopy className="icon" />
                      <a
                        onClick={() => handleCopy(activePayment.account_number)}
                      >
                        Sao chép nội dung chuyển khoản
                      </a>
                    </span>
                  </div>
                </div>
                <div className="info">
                  <div className="info-left">
                    <h5>Chủ tài khoản</h5>
                  </div>
                  <div className="info-right">
                    <h5>{activePayment.account_owner}</h5>
                  </div>
                </div>
                <div className="info">
                  <div className="info-left">
                    <h5>Chi nhánh ngân hàng</h5>
                  </div>
                  <div className="info-right">
                    <h5>{activePayment.bank_branch}</h5>
                  </div>
                </div>
                <div className="info">
                  <div className="info-left">
                    <h5>Số Tiền</h5>
                  </div>
                  <div className="info-right">
                    <h5>
                      {CurrencyWithCommas(depositMoney)} đ
                    </h5>
                    <span>
                      <FaRegCopy className="icon" />
                      <a
                        onClick={() => handleCopy(depositMoney + '')}
                      >
                        Sao chép nội dung chuyển khoản
                      </a>
                    </span>
                  </div>
                </div>
                <div className="info">
                  <div className="info-left">
                    <h5>Nội dung chuyển khoản</h5>
                  </div>
                  <div className="info-right">
                    <h5>{orderId}</h5>
                    <span>
                      <FaRegCopy className="icon" />
                      <a
                        onClick={() => handleCopy(orderId || '')}
                      >
                        Sao chép nội dung chuyển khoản
                      </a>
                    </span>
                  </div>
                </div>
                <div className="info">
                  <div className="info-left">
                    <h5>Gửi ảnh bằng chứng</h5>
                  </div>
                  <div className="info-right">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      maxCount={1}
                      beforeUpload={beforeUpload}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <FaImage className="icon-upload-image" />}
                    </Upload>
                  </div>
                </div>
              </div>
              <div className="wrapper-button-confirm">
                <Button className="button-confirm" style={{ boxSizing: 'content-box' }} loading={loading}
                  onClick={() => handleConfirmPayment()}>Xác nhận chuyển khoản</Button>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} xl={5}>
            <div className="wrapper-info-items">
              <div className="id-order">
                <h5>
                  Đơn hàng: <span>{orderId}</span>{" "}
                </h5>
              </div>
              <div className="items">
                {items.map((item) => (
                  <div className="item" key={item.productId}>
                    <div className="item-image">
                      <img src={item.productImage} alt={item.productName} />
                    </div>
                    <div className="item-info">
                      <a className="item-info-name">{item.productName}</a>
                      <div className="price-quantity">
                        <div className="right">
                          <span>Giá</span>
                        </div>
                        <div className="left">
                          <span>{CurrencyWithCommas(item.itemFinalPrice)} đ</span>{" "}
                        </div>
                      </div>
                      <div className="price-quantity">
                        <div className="right">
                          <span>SL</span>
                        </div>
                        <div className="left">
                          <span>{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="price">
                <div className="delivery-cost">
                  <div className="right">
                    <span>V/c nội địa Nhật</span>
                  </div>
                  <div className="left">
                    <span>Đang cập nhật</span>
                  </div>
                </div>
                <div className="delivery-cost">
                  <div className="right">
                    <span>V/c Nhật Việt</span>
                  </div>
                  <div className="left">
                    <span>Đang cập nhật</span>
                  </div>
                </div>
                <div className="delivery-cost">
                  <div className="right">
                    <span>Phụ phí</span>
                  </div>
                  <div className="left">
                    <span>Đang cập nhật</span>
                  </div>
                </div>
                <div className="total-cost">
                  <h5>Thành tiền</h5>
                  <h2>{CurrencyWithCommas(orderDetail.finalPrice)} đ</h2>
                </div>
                <div className="total-cost-after-math">
                  <span>Số tiền cần tạm ứng</span>
                  <div className="prepayment">
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
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Payment