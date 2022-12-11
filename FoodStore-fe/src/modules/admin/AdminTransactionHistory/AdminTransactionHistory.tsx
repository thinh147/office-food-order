import usePaging from '@core/hooks/pagingHook'
import { IOrderListRequest } from '@core/models/serverRequest'
import { IOrderResponse } from '@core/models/serverResponse'
import { fetchListOrder } from '@services/orderService'
import { Table } from 'antd'
import React, { useState } from 'react'
import { columnsHistory, ORDER_FILTER_DEFAULT } from '../config/order'

const AdminTransactionHistory = () => {
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

  return (
    <>
      <Table columns={columnsHistory()} dataSource={orders}
        pagination={{ position: ['bottomRight'], total: totals, pageSize: filter.size }}
        rowKey={(row) => row.id}
      />
    </>
  )
}

export default AdminTransactionHistory