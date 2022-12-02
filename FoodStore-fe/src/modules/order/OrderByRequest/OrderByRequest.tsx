import { Breadcrumb, Button, Card, Col, message, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import RequestItem from "./RequestItem";

import { useAuthContext, useCartContext, usePropertyContext } from "@context";
import { FAST_ORDER_ITEM_DEFAULT } from "@core/constant/form";
import { STORAGE_KEY } from "@core/constant/setting";
import { ICreateFastOrderRequest, IFastOrderItem } from "@core/models/serverRequest";
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import "./index.scss";
import { fastOrderToCartItem } from "@core/helpers/converter";
import { FcOnlineSupport } from 'react-icons/fc'

const { Paragraph, Text, Link } = Typography;


const OrderByRequest = () => {
  const navigation = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const { auth: { token } } = useAuthContext();
  const { addToCart } = useCartContext();
  const [itemsRequest, setItemsRequest] = useState<IFastOrderItem[]>([{ ...FAST_ORDER_ITEM_DEFAULT }]);
  const { property } = usePropertyContext();
  const isLogin = token !== '';

  useEffect(() => {
    if (!isSubmit) return;
    if (isSubmit && itemsRequest.every(item => item.isValidate)) {
      submit();
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit, itemsRequest])

  const handleAddNewRequestItem = () => {
    const temp_items_request = [...itemsRequest];

    temp_items_request.push({ ...FAST_ORDER_ITEM_DEFAULT });

    setItemsRequest(temp_items_request);
  };

  const handleDeleteRequestItem = (index: number) => {
    setItemsRequest((prev) => {
      prev.splice(index, 1);
      return [...prev]
    });
  };

  const handleUpdateItem = (item: IFastOrderItem) => {
    item.netPrice = +item.yenPrice * property.exchangeRate;
    item.discountPrice = item.netPrice * +item.quantity * ((item.percentDiscount || 0) / 100);
    item.vatPrice = (item.netPrice * item.quantity - item.discountPrice) * ((100 - property.vatPercent) / 100);
    item.finalPrice = item.vatPrice;
    return { ...item };
  }
  const handleUpdateRequestItem = (values: any, index: number) => {
    setItemsRequest((prev) => {
      prev[index] = handleUpdateItem(values);
      return [...prev];
    })
  }

  const handleClickSubmit = () => {
    if (!isLogin) {
      message.error('Bạn phải đặng nhập để sử dụng tính năng này');
      return;
    }
    setItemsRequest(prev => prev.map(item => ({ ...item, isValidate: false })));
    setIsSubmit(true);
  };

  const submit = async () => {
    const request: Omit<ICreateFastOrderRequest, 'address'> = {
      pointUsed: 0,
      voucherPrice: 0,
      finalPrice: itemsRequest.reduce((acc, cur) => acc = cur.finalPrice, 0),
      netPrice: itemsRequest.reduce((acc, cur) => acc + (cur.netPrice * cur.quantity), 0),
      vatPrice: itemsRequest.reduce((acc, cur) => acc + cur.vatPrice, 0),
      items: itemsRequest
    }
    localStorage.setItem(STORAGE_KEY.FAST_ORDER, JSON.stringify(request));
    navigation("/order/address?orderType=fastOrder");
  }

  const addCard = (item: IFastOrderItem) => {
    if (!isLogin) {
      message.error('Bạn phải đặng nhập để sử dụng tính năng này');
      return;
    }
    addToCart(fastOrderToCartItem(item));
  }

  const totalFinalPrice = itemsRequest.reduce((acc, cur) => acc = cur.finalPrice, 0);

  return (
    <div style={{ paddingTop: '16px' }}>
      <Breadcrumb >
        <Breadcrumb.Item >
          <AiOutlineHome /> Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Nhập thông tin sản phẩm
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Vui lòng nhập thông tin sản phẩm bạn muốn đặt vào các ô dưới đây:">
        <Row gutter={8}>
          <Col span={20}>
            {itemsRequest.map((item, index) => (
              <div className="mb-16" key={`${item.productUrl}_${index}`}>
                <Row className="mb-8">
                  <Col span={12}>
                    <Text strong>{itemsRequest.length === 1 ? 'THÔNG TIN SẢN PHẨM:' : `Sản phẩm: ${index + 1}`}</Text>
                  </Col>
                  <Col span={12}>
                    <div className="d-flex justify-content-end gap-8">
                      {itemsRequest.length > 1 &&
                        <Button type="primary" danger onClick={() => handleDeleteRequestItem(index)}>Xóa</Button>}
                      <Button icon={<AiOutlineShoppingCart />} type="primary" disabled={!item.isValidate} onClick={() => addCard(item)}>Thêm vào giỏ hàng</Button>
                    </div>
                  </Col>
                </Row>
                <Card key={`${index}_${Math.random() * 10000 + 1}`}>
                  <RequestItem
                    index={index}
                    handleUpdateRequestItem={handleUpdateRequestItem.bind(this)}
                    itemRequest={item}
                    isSubmit={isSubmit}
                  />
                </Card>
              </div>
            ))}
            <Paragraph>
              <Text strong>Lưu ý: </Text><Text>số tiền trên chưa bao gồm phí vận chuyển Nhật - Việt, phí vận chuyển nội địa và <Text type="warning">phụ phí</Text> (nếu có)</Text>
            </Paragraph>
            <div className="wrapper-order-by-request">
              <div className="items-controller">
                <Row>
                  <Col span={12}>
                    <div className="add-request-item">
                      <span
                        className="button-icon"
                        onClick={() => handleAddNewRequestItem()}
                      >
                        <FaPlus className="icon" />
                      </span>
                      <a className="text-add" onClick={() => handleAddNewRequestItem()}>
                        Thêm sản phẩm
                      </a>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="d-flex justify-content-end align-items-center h-100">
                      <Button icon={<AiOutlineShoppingCart />} type="primary" size="large" onClick={() => handleClickSubmit()}>Tạo đơn hàng</Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <Card>
              <Paragraph><Text strong>Bận cần hỗ trợ?</Text></Paragraph>
              <Paragraph><Link>Hướng dẫn mua hàng</Link></Paragraph>
              <Paragraph><Link>Hướng dẫn thanh toán</Link></Paragraph>
              <Paragraph><Link>Chính sách và điều khoản</Link></Paragraph>
              <Paragraph><Text><FcOnlineSupport /> Liên hệ với chúng tôi</Text>. <Link>Liên hệ ngay</Link></Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
      {/* <OrderStatus status={1} /> */}
      {/* <div className="wrapper-order-by-request">
        <div className="items-controller">
          <div className="header">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" xl={1}>
                <div className="header-item">STT</div>
              </Col>
              <Col className="gutter-row" xl={4}>
                <div className="header-item">Thuộc tính</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="header-item">Số lượng</div>
              </Col>
              <Col className="gutter-row" xl={4}>
                <div className="header-item">Giá</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="header-item">VAT</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="header-item">Thành tiền</div>
              </Col>
              <Col className="gutter-row" xl={6}>
                <div className="header-item">Ghi chú</div>
              </Col>
            </Row>
          </div>
          <div className="items">
            {itemsRequest.map((item, index) => (
              <RequestItem
                index={index}
                key={`${index}_${Math.random() * 10000 + 1}`}
                handleDeleteRequestItem={handleDeleteRequestItem.bind(this, index)}
                handleUpdateRequestItem={handleUpdateRequestItem.bind(this)}
                itemRequest={item}
                property={property}
              />
            ))}
          </div>
          <div className="calculate-pre-pay">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" xl={15}>
                <div className="pre-pay-title">Tạm tính</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="pre-pay-total">
                  {CurrencyWithCommas(totalFinalPrice)} đ
                </div>
              </Col>
              <Col className="gutter-row" xl={6}>
                <div className="pre-pay">
                  Số tiền tạm ứng:{" "}
                  {CurrencyWithCommas(totalFinalPrice * depositPercent)} đ
                </div>
              </Col>
            </Row>
          </div>
          <div className="add-request-item">
            <span
              className="button-icon"
              onClick={() => handleAddNewRequestItem()}
            >
              <FaPlus className="icon" />
            </span>
            <a className="text-add" onClick={() => handleAddNewRequestItem()}>
              Thêm sản phẩm
            </a>
          </div>
          <div className="policy">
            <p>
              <span className="important">Lưu ý: </span>
              1993 đảm bảo giá sản phẩm không thay đổi trong vòng 60 phút. Căn
              cứ vào thời điểm quý khách{" "}
              <span className="very-important">[Xác nhận đặt hàng]</span> thành
              công. Đối với giao dịch phát sinh từ 21h, 1993 sẽ xử lý sau 8h
              sáng ngày hôm sau.
            </p>
            <p>
              Các mặt hàng xa xỉ giá trị cao hoặc các mặt hàng điện tử, công
              nghệ cao, hàng cồng kềnh, dễ vỡ, sẽ có phụ phí vận chuyển quốc tế.
              Mời quý khách ấn vào đây để xem mức phụ phí cho những mặt hàng
              trên.
            </p>
            <p>
              Giầy dép khi vận chuyển về Việt Nam,{" "}
              <span className="important">MẶC ĐỊNH LÀ KHÔNG CÓ HỘP.</span>
            </p>
            <p>
              Sau khi xác nhận đặt hàng, quý khách{" "}
              <span className="important">KHÔNG THỂ HỦY</span> hoặc{" "}
              <span className="important">KHÔNG THỂ THAY ĐỔI</span> nội dung đơn
              hàng.
            </p>
          </div>
          <div className="button-order" onClick={() => handleClickSubmit()}>
            <Button
              style={{
                backgroundColor: "#ff8000",
                color: "#fff",
                fontFamily: "Roboto sans-serif",
                fontWeight: 300,
                padding: "0px 20px",
              }}
            >
              <BsCartPlus style={{ fontSize: "16px", marginRight: "5px" }} />
              Tiến hành đặt hàng
            </Button>
          </div>
        </div>
      </div> */}

    </div>
  );
}

export default OrderByRequest