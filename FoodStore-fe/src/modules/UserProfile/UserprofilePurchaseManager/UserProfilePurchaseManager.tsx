import { STATUS_CODE } from '@core/constant/setting';
import usePaging from '@core/hooks/pagingHook';
import { IOrderListRequest } from '@core/models/serverRequest';
import { IOrderResponse } from '@core/models/serverResponse';
import { ORDER_FILTER_DEFAULT } from '@modules/admin/config/order';
import { fetchListFastOrder, fetchListOrder } from '@services/orderService';
import { Col, Menu, Skeleton, Typography } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';


const { Title } = Typography;

const itemType = [
  { key: "/profile/transaction/doing", label: 'Đơn hàng Amazon/Mercari', Component: lazy(() => import('./table/OrderChannelTable')) },
  { key: "/profile/transaction/request", label: 'Lịch sử đặt hàng', Component: lazy(() => import('./table/OrderRequestTable')) },
]

// const menuItem = itemType.map(({ Component, ...item }) => ({ ...item }));

const tableOrder = (key: string) => itemType.find(item => item.key === key)?.Component;

const UserProfilePurchaseManager = () => {

  const { type } = useParams();
  const [selectedKeys, setSelectedKeys] = useState<string[] | undefined>();
  const navigate = useNavigate();
  const { filter, pageChange, setFilter, sortChange } = usePaging<IOrderListRequest>({ defaultRequest: ORDER_FILTER_DEFAULT, callback: getOrders.bind(this, type) });
  const [orders, setOrders] = useState<IOrderResponse[]>([]);
  const [totals, setTotals] = useState(0);

  async function getOrders(params: IOrderListRequest) {

    const response = await fetchListOrder(params);
    if (response.code === STATUS_CODE.SUCCESS) {
      const { elements, totalElements } = response.data;
      setOrders(elements);
      setTotals(totalElements);
    }
  }

  useEffect(() => {
    if (type) {
      setSelectedKeys([`/profile/transaction/${type}`]);
      getOrders(filter);
    }
  }, [type])

  const Table = selectedKeys && selectedKeys.length && tableOrder(selectedKeys[0]);

  const handleClick = (event: MenuInfo) => {
    navigate(event.key);
  };

  return (
    <div>
      <div >
        {/* <Col className='UserprofilePurchaseManager'>
          <Menu onClick={handleClick} style={{ width: '100%' }} selectedKeys={selectedKeys}
            mode="horizontal" items={menuItem}>
          </Menu>
        </Col> */}
        <div className='half-circle'>
      </div>
      <div className='title'>
        <Title level={5}>Lịch sử đặt hàng</Title>
      </div>
        <Col className='UserprofilePurchaseManager2'>
          {/* <h1 style={{ textAlign: 'center' }}> <FrownOutlined style={{ fontSize: '95px', color: '#ffa940' }} /></h1>
          <h1 style={{ textAlign: 'center' }}>Không tìm thấy thông tin</h1>
          <h4 style={{ textAlign: 'center' }}>Xin lỗi, bạn chưa có thông tin ngân hàng</h4> */}
          {Table ? <Suspense fallback={<Skeleton />} ><Table orders={orders} /></Suspense> : <Skeleton />}
        </Col>
      </div>
    </div >
  )
}

export default UserProfilePurchaseManager