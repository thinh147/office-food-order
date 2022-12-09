import usePaging from '@core/hooks/pagingHook';
import { OrderStatus, OrderType } from '@core/models/order';
import { IOrderListRequest } from '@core/models/serverRequest';
import {  IOrderResponse } from '@core/models/serverResponse';
import { fetchListFastOrder, acceptOrder } from '@services/shipperService';
import { Input, Table } from 'antd';
import { useEffect, useState } from 'react';
import { columns, defaultData } from '../../admin/config/fastOrder';
import { ORDER_FILTER_DEFAULT } from '../../admin/config/order';
import ShipperFastOrderCart from './ShipperFastOrderCart';
import ShipperFastOrderUpdate from './ShipperFastOrderUpdate';
import './index.scss';
import { message } from "antd";


const ShipperFastOrder = () => {
  const { Search } = Input;
  const [fastOrder, setFastOrder] = useState<IOrderResponse[]>([]);
  const [defaultOrder, setDefaultOrder] = useState<any>([]);
  const [isMerged, setIsMerged] = useState(false);
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
  };

  useEffect(() => {
    const listOrder = JSON.parse(localStorage.getItem('orders'));
    console.log(listOrder);
    if (listOrder && !isMerged) {
      setDefaultOrder([...listOrder, ...defaultOrder]);
      setIsMerged(true);
    }
  }, []);

  useEffect(() => {
    console.log('12u31923ui91203');
  }, [defaultOrder]);

  async function getOrders(params: IOrderListRequest) {
    const resposne = await fetchListFastOrder(params);
    if (resposne.code === 200) {
      setFastOrder(resposne.data.elements);
      setTotals(resposne.data.totalElements);
    }

  }

  const onEdit = async (data: IOrderResponse) => {
    const arr = defaultOrder;
    const index = arr.findIndex((item) => item.code === data.code);
    if(data.status === 1) {
      if(index > -1) {
        arr[index].status = 11;
        
      }
    } else {
      if (index > -1) {
        // arr.splice(index, 1);
        arr[index].status = 13;
        const arrDone = JSON.parse(localStorage.getItem('doneOrder')) || [];
        console.log(arr[index]);
        arrDone.push(arr[index]);
        localStorage.setItem('doneOrder', JSON.stringify(arrDone));
        localStorage.setItem('orders', JSON.stringify(arr));
      }
    }
    setDefaultOrder(arr);
  };

  const openTransactionHistory = (data: IOrderResponse) => {
    console.log(123);
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

  console.log(defaultOrder);

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
        dataSource={defaultOrder.filter((item) => item.status !== 13)} rowKey={(value) => value.code}
        pagination={{ position: ['bottomRight'], total: totals, pageSize: filter.size }}
      />
      {modal.edit && <ShipperFastOrderUpdate data={order} handleCancel={turnOffModal} handleOk={updateHandler}></ShipperFastOrderUpdate>}
      {modal.cart && order.code && <ShipperFastOrderCart data={{ ...order, type: OrderType.FAST_ORDER }} handleOk={turnOffModal} handleCancel={turnOffModal}></ShipperFastOrderCart>}
    </>
  )
}

export default ShipperFastOrder