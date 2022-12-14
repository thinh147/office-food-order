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
      message.error('B???n ph???i ?????ng nh???p ????? s??? d???ng t??nh n??ng n??y');
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
      message.error('B???n ph???i ?????ng nh???p ????? s??? d???ng t??nh n??ng n??y');
      return;
    }
    addToCart(fastOrderToCartItem(item));
  }

  const totalFinalPrice = itemsRequest.reduce((acc, cur) => acc = cur.finalPrice, 0);

  return (
    <div style={{ paddingTop: '16px' }}>
      <Breadcrumb >
        <Breadcrumb.Item >
          <AiOutlineHome /> Trang ch???
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Nh???p th??ng tin s???n ph???m
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Vui l??ng nh???p th??ng tin s???n ph???m b???n mu???n ?????t v??o c??c ?? d?????i ????y:">
        <Row gutter={8}>
          <Col span={20}>
            {itemsRequest.map((item, index) => (
              <div className="mb-16" key={`${item.productUrl}_${index}`}>
                <Row className="mb-8">
                  <Col span={12}>
                    <Text strong>{itemsRequest.length === 1 ? 'TH??NG TIN S???N PH???M:' : `S???n ph???m: ${index + 1}`}</Text>
                  </Col>
                  <Col span={12}>
                    <div className="d-flex justify-content-end gap-8">
                      {itemsRequest.length > 1 &&
                        <Button type="primary" danger onClick={() => handleDeleteRequestItem(index)}>X??a</Button>}
                      <Button icon={<AiOutlineShoppingCart />} type="primary" disabled={!item.isValidate} onClick={() => addCard(item)}>Th??m v??o gi??? h??ng</Button>
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
              <Text strong>L??u ??: </Text><Text>s??? ti???n tr??n ch??a bao g???m ph?? v???n chuy???n Nh???t - Vi???t, ph?? v???n chuy???n n???i ?????a v?? <Text type="warning">ph??? ph??</Text> (n???u c??)</Text>
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
                        Th??m s???n ph???m
                      </a>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="d-flex justify-content-end align-items-center h-100">
                      <Button icon={<AiOutlineShoppingCart />} type="primary" size="large" onClick={() => handleClickSubmit()}>T???o ????n h??ng</Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <Card>
              <Paragraph><Text strong>B???n c???n h??? tr????</Text></Paragraph>
              <Paragraph><Link>H?????ng d???n mua h??ng</Link></Paragraph>
              <Paragraph><Link>H?????ng d???n thanh to??n</Link></Paragraph>
              <Paragraph><Link>Ch??nh s??ch v?? ??i???u kho???n</Link></Paragraph>
              <Paragraph><Text><FcOnlineSupport /> Li??n h??? v???i ch??ng t??i</Text>. <Link>Li??n h??? ngay</Link></Paragraph>
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
                <div className="header-item">Thu???c t??nh</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="header-item">S??? l?????ng</div>
              </Col>
              <Col className="gutter-row" xl={4}>
                <div className="header-item">Gi??</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="header-item">VAT</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="header-item">Th??nh ti???n</div>
              </Col>
              <Col className="gutter-row" xl={6}>
                <div className="header-item">Ghi ch??</div>
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
                <div className="pre-pay-title">T???m t??nh</div>
              </Col>
              <Col className="gutter-row" xl={3}>
                <div className="pre-pay-total">
                  {CurrencyWithCommas(totalFinalPrice)} ??
                </div>
              </Col>
              <Col className="gutter-row" xl={6}>
                <div className="pre-pay">
                  S??? ti???n t???m ???ng:{" "}
                  {CurrencyWithCommas(totalFinalPrice * depositPercent)} ??
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
              Th??m s???n ph???m
            </a>
          </div>
          <div className="policy">
            <p>
              <span className="important">L??u ??: </span>
              1993 ?????m b???o gi?? s???n ph???m kh??ng thay ?????i trong v??ng 60 ph??t. C??n
              c??? v??o th???i ??i???m qu?? kh??ch{" "}
              <span className="very-important">[X??c nh???n ?????t h??ng]</span> th??nh
              c??ng. ?????i v???i giao d???ch ph??t sinh t??? 21h, 1993 s??? x??? l?? sau 8h
              s??ng ng??y h??m sau.
            </p>
            <p>
              C??c m???t h??ng xa x??? gi?? tr??? cao ho???c c??c m???t h??ng ??i???n t???, c??ng
              ngh??? cao, h??ng c???ng k???nh, d??? v???, s??? c?? ph??? ph?? v???n chuy???n qu???c t???.
              M???i qu?? kh??ch ???n v??o ????y ????? xem m???c ph??? ph?? cho nh???ng m???t h??ng
              tr??n.
            </p>
            <p>
              Gi???y d??p khi v???n chuy???n v??? Vi???t Nam,{" "}
              <span className="important">M???C ?????NH L?? KH??NG C?? H???P.</span>
            </p>
            <p>
              Sau khi x??c nh???n ?????t h??ng, qu?? kh??ch{" "}
              <span className="important">KH??NG TH??? H???Y</span> ho???c{" "}
              <span className="important">KH??NG TH??? THAY ?????I</span> n???i dung ????n
              h??ng.
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
              Ti???n h??nh ?????t h??ng
            </Button>
          </div>
        </div>
      </div> */}

    </div>
  );
}

export default OrderByRequest