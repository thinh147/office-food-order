import usePaging from '@core/hooks/pagingHook'
import { OrderStatus, OrderType } from '@core/models/order'
import { IOrderListRequest } from '@core/models/serverRequest'
import { IOrderDetailResponse, IOrderResponse } from '@core/models/serverResponse'
import { fetchListOrder } from '@services/orderService'
import { Col, Input, Row, Table } from 'antd'
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
  const { Search } = Input;
  const onSearch = (value: any) => {
    console.log(value)
  }

  const onEdit = (data: IOrderResponse) => {
    setOrder(data);
    setModal(prev => ({ ...prev, edit: true }));
  }

  const onTransactionHistory = async ({ id }: IOrderResponse) => {
    console.log(id);
  }

  const onOpenDetail = (params: IOrderResponse) => {
    setOrder(params);
    setModal(prev => ({ ...prev, cart: true }));
  }

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
      <div className='mb-8'>
        <Row>
          <Col span={6} >
            <Search placeholder="T??m ki???m" onSearch={onSearch} enterButton />
          </Col>
          <Col span={6} >
            <Input style={{ marginLeft: '10px' }} placeholder="---Ch???n tr???ng th??i---" />
          </Col>
        </Row>
      </div>
      <Table columns={columns(onEdit, onTransactionHistory, onOpenDetail)} dataSource={orders}
        pagination={{ position: ['bottomRight'], total: totals, pageSize: filter.size }}
        rowKey={(row) => row.id}
      />

      {modal.edit && <AdminOrderListEdit data={order} handleOk={handleOk} handleCancel={function (): void { setModal(prev => ({ ...prev, edit: false })); }} />}
      {modal.cart && order && <AdminFastOrderCart data={{ ...order, type: OrderType.SALE_ORDER }} handleOk={turnOffDetail} handleCancel={turnOffDetail}></AdminFastOrderCart>}
    </>
  )
}

export default AdminOrderList