import AddressForm from '@components/FormComponents/AddressForm';
import HeaderOrder from '@components/HeaderOrder';
import { useCartContext } from '@context';
import { STATUS_CODE, STORAGE_KEY } from '@core/constant/setting';
import { parseJSON } from '@core/helpers/converter';
import { ICreateFastOrderRequest, ICreateOrderRequest } from '@core/models/serverRequest';
import { IUserAddress } from '@core/models/user';
import { createFastOrder, createOrder } from '@services/orderService';
import { Checkbox, Col, message, Row } from 'antd';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './index.scss';
import { v4 as uuid} from 'uuid';

const OrderAddress = () => {
  const [confirmPolicy, setConfirmPolicy] = useState(true);

  const [address, setAddress] = useState<IUserAddress | null>(null);

  const { carts, cartInfo } = useCartContext();

  const navigation = useNavigate();
  const [search] = useSearchParams();

  const handleConfirmOrder = async () => {
    if (!address) return message.error('Vui lòng chọn địa chỉ giao hàng');
    // const orderType = search.get('orderType');
    // if (orderType && orderType === 'fastOrder') {
    //   await handlerCreateFastOrder();
    // } else {
    //   await handlerCreateNormalOrder();
    // }
    // const newOrder: ICreateOrderRequest = {
    //   addressDto: address,
    //   pointInUsed: 0,
    //   voucherPrice: 0,
    //   inputData: { items: carts, ...cartInfo }
    // }
    const listOrders = JSON.parse(localStorage.getItem('orders')) || [];
    listOrders.push({
      customerAddress: address.address,
      customerName: address.name,
      customerPhone: address.phone,
      status: 1,
      totalNetPrice: cartInfo.totalPriceVnd,
      code: uuid(),
    });
    localStorage.setItem('orders', JSON.stringify(listOrders));
    message.success('Tạo yêu cầu mua hàng thành công, Xin bạn hãy tiến hàng đặt cọc để được xử lý sớm nhất');
    navigation(`/`);
  };

  const handlerCreateNormalOrder = async () => {
    if (!address) return;
    const request: ICreateOrderRequest = {
      addressDto: address,
      pointInUsed: 0,
      voucherPrice: 0,
      inputData: { items: carts, ...cartInfo }
    }
    const { code, data } = await createOrder(request);
    if (code === STATUS_CODE.SUCCESS) {
      message.success('Tạo yêu cầu mua hàng thành công, Xin bạn hãy tiến hàng đặt cọc để được xử lý sớm nhất');
      navigation(`/order/payment/${data.orderCode}`);
    }
  }

  const handlerCreateFastOrder = async () => {
    if (!address || !localStorage.getItem(STORAGE_KEY.FAST_ORDER)) return;
    const request: ICreateFastOrderRequest = {
      ...parseJSON(localStorage.getItem(STORAGE_KEY.FAST_ORDER) || '', {} as ICreateFastOrderRequest),
      address: address,
    }
    const { code, data } = await createFastOrder(request);
    if (code === STATUS_CODE.SUCCESS) {
      message.success('Tạo yêu cầu mua hàng thành công, Xin bạn hãy tiến hàng đặt cọc để được xử lý sớm nhất');
      navigation(`/order/payment/${data.code}?orderType=fastOrder`);
    }
  }

  return (
    <div className="wrapper-order-confirmation">
      <HeaderOrder type_page="Confirm Address" />
      <div className="controller-address">
        <div className="addresses">
          <h5 className="header-addresses">Địa chỉ giao hàng của bạn:</h5>
          <AddressForm onClickAddress={(address) => setAddress(address)} addButtonWrapper={
            <div className="add-more-address">
              <p className="header-add-more">
                Bạn muốn giao hàng đến địa chỉ khác?
              </p>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} xl={8}>
                  <div className="button-side">
                    <div className="button">
                      <FaPlus className="icon-add" />
                      <span>Thêm địa chỉ nhận hàng</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          }
          ></AddressForm>
        </div>
        <div className="add-more-address">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={24} xl={8}>
            </Col>

            <Col className="gutter-row" xs={24} xl={16}>
              <div className="radio-confirm-read-policy">
                <Checkbox
                  checked={confirmPolicy}
                  onChange={() => setConfirmPolicy((prev) => !prev)}
                >
                  Đồng ý với{" "}
                  <span className="ember">
                    Điều khoản & điều kiện giao dịch
                  </span>{" "}
                  của Office Food Việt Nam
                </Checkbox>
              </div>
            </Col>
          </Row>
        </div>
        <div className="confirm-order">
          <button className="inner-button" onClick={() => handleConfirmOrder()} disabled={!confirmPolicy || address == null}>
            <span>Xác Nhận Đặt Hàng</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderAddress