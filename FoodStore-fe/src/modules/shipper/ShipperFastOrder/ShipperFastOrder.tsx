import usePaging from '@core/hooks/pagingHook';
import { OrderStatus, OrderType } from '@core/models/order';
import { IOrderListRequest } from '@core/models/serverRequest';
import {  IOrderResponse } from '@core/models/serverResponse';
import { fetchListFastOrder, acceptOrder } from '@services/shipperService';
import { Input, Table } from 'antd';
import { useState } from 'react';
import { columns } from '../../admin/config/fastOrder';
import { ORDER_FILTER_DEFAULT } from '../../admin/config/order';
import ShipperFastOrderCart from './ShipperFastOrderCart';
import ShipperFastOrderUpdate from './ShipperFastOrderUpdate';
import './index.scss';
import { message } from "antd";


const ShipperFastOrder = () => {
  const { Search } = Input;
  const [fastOrder, setFastOrder] = useState<IOrderResponse[]>([]);
  const [totals, setTotals] = useState(0);
  const [modal, setModal] = useState({
    edit: false,
    history: false,
    cart: false
  });
  const [order, setOrder] = useState({} as IOrderResponse);
  const { filter, pageChange, setFilter, sortChange } = usePaging<IOrderListRequest>({ defaultRequest: ORDER_FILTER_DEFAULT, callback: getOrders });
  const onSearch = (value: any) => {
    console.log(value)
  }

  async function getOrders(params: IOrderListRequest) {
    const resposne = await fetchListFastOrder(params);
    if (resposne.code === 200) {
      setFastOrder(resposne.data.elements);
      setTotals(resposne.data.totalElements);
    }

  }

  const onEdit = async (data: IOrderResponse) => {
    const res = await acceptOrder(data.orderCode);
    if (res) {
      message.success('Nhận đơn hàng thành công')
      getOrders(filter);
    }
  }

  const openTransactionHistory = (data: IOrderResponse) => {
    console.log(data);
  }

  const openCartOrder = (data: IOrderResponse) => {
    setOrder(data);
    setModal(prev => ({ ...prev, cart: true }));
  }

  const turnOffModal = () => {
    setModal({
      cart: false,
      edit: false,
      history: false
    })
  }

  const updateHandler = (data: OrderStatus) => {
    if (!order.code) return;
    setFastOrder((prev) => {
      const idx = prev.findIndex(product => product.code === order.code);
      if (idx > -1) {
        const old = prev[idx];
        old.status = data;
        // prev.splice(idx, 1, data);
      }
      // else {
      //   prev.unshift(data);
      //   setTotals(totals => totals + 1);
      // }
      return [...prev];
    })
    setModal(prev => ({ ...prev, edit: false }));
    setOrder({} as IOrderResponse);
  }

  return (
    <>
      <div className='mb-8'>
        {/* <Row>
          <Col span={6} >
            <Search placeholder="phone: , name: ..." onSearch={onSearch} enterButton />
          </Col>
        </Row> */}
      </div>
      <Table columns={columns(onEdit, openTransactionHistory, openCartOrder)}
        dataSource={fastOrder} rowKey={(value) => value.code}
        pagination={{ position: ['bottomRight'], total: totals, pageSize: filter.size }}
      />
      {modal.edit && <ShipperFastOrderUpdate data={order} handleCancel={turnOffModal} handleOk={updateHandler}></ShipperFastOrderUpdate>}
      {modal.cart && order.code && <ShipperFastOrderCart data={{ ...order, type: OrderType.FAST_ORDER }} handleOk={turnOffModal} handleCancel={turnOffModal}></ShipperFastOrderCart>}
    </>
  )
}

export default ShipperFastOrder