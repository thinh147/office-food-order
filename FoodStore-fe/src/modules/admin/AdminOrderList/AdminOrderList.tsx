import { STATUS_CODE } from '@core/constant/setting'
import usePaging from '@core/hooks/pagingHook'
import {  OrderStatus, OrderType } from '@core/models/order'
import { IOrderListRequest } from '@core/models/serverRequest'
import { IOrderResponse } from '@core/models/serverResponse'
import { fetchListOrder, handleApproveOrder, handleCancelOrderItem, updateOrderStatus } from '@services/orderService'
import { Input, Table, message } from 'antd'
import React, { useState } from 'react'
import AdminFastOrderCart from '../AdminFastOrder/AdminFastOrderCart'
import { columns, ORDER_FILTER_DEFAULT } from '../config/order'
import AdminOrderListEdit from './AdminOrderListEdit'

const AdminOrderList = () => {
  const [orders, setOrders] = useState<IOrderResponse[]>([]);
  const [order, setOrder] = useState<IOrderResponse | null>(null);
  const [totals, setTotals] = useState(0);
  const [modal, setModal] = useState({
    edit: false,
    cart: false
  });
  const { filter, pageChange, setFilter, sortChange } = usePaging<IOrderListRequest>({ defaultRequest: ORDER_FILTER_DEFAULT, callback: getOrders.bind(this) });

  async function getOrders(params: IOrderListRequest) {
    const resposne = await fetchListOrder(params);
    if (resposne.code === 200) {
      setOrders(resposne.data.elements);
      setTotals(resposne.data.totalElements);
    }

  }

  const handleChangeOrderStatus = async (data: IOrderResponse, statusType: number) => {
    console.log(data);
    const response = await updateOrderStatus({ orderCode: data?.code || '', updateType: statusType }, OrderType.SALE_ORDER);
    if (response.code === STATUS_CODE.SUCCESS) {
      handleOk(response.data);
      message.success('Cập nhật đơn hàng thành công')
    }
  };

  const handleAcceptOrder = async (data: IOrderResponse) => {
    console.log(data);
    const res = await handleApproveOrder(data.orderCode);
    if(res.code === STATUS_CODE.SUCCESS) {
      message.success('Duyệt đơn hàng thành công');
      getOrders(filter);
    }
  };

  const handleCancelOrder = async (data: IOrderResponse) => {
    const res = await handleCancelOrderItem(data.orderCode);
    if(res.code === STATUS_CODE.SUCCESS) {
      message.success('Duyệt đơn hàng thành công');
      getOrders(filter);
    }
  };

  const handleOk = (data: OrderStatus) => {
    if (!order) return;
    setOrders((prev) => {
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
    setOrder(null);
  }

  const turnOffDetail = () => setModal(prev => ({ ...prev, cart: false }))

  return (
    <>
      <Table columns={columns(handleAcceptOrder, handleCancelOrder)} dataSource={orders}
        pagination={{ position: ['bottomRight'], total: totals, pageSize: filter.size }}
        rowKey={(row) => row.id}
      />

      {modal.edit && <AdminOrderListEdit data={order} handleOk={handleOk} handleCancel={function (): void { setModal(prev => ({ ...prev, edit: false })); }} />}
      {modal.cart && order && <AdminFastOrderCart data={{ ...order, type: OrderType.SALE_ORDER }} handleOk={turnOffDetail} handleCancel={turnOffDetail}></AdminFastOrderCart>}
    </>
  )
}

export default AdminOrderList