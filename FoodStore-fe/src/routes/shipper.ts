import { RouterConfig } from "@core/models/config";
import { lazy } from "react";
import { AiOutlineDashboard, AiOutlineMoneyCollect, AiOutlineShoppingCart, AiOutlineTransaction, AiFillSetting } from "react-icons/ai";
import { GiClothes, GiRunningNinja } from 'react-icons/gi';
import { FaTags } from 'react-icons/fa';
import { shipperGuard } from "./guard/shipperGuard";
import AntdSkeleton from "@components/Skeleton/AntdSkeleton";

const routes: RouterConfig[] = [
  {
    path: 'shipper',
    component: lazy(() => import('@components/LayoutShipper')),
    guard: shipperGuard,
    key: 'shipper',
    children: [
      {
        index: true,
        component: lazy(() => import('@modules/shipper/ShipperDashboard')),
        key: 'dashboard',
        Icon: AiOutlineDashboard,
        name: 'Bảng điều khiển',
        fallback: AntdSkeleton
      },
      {
        path: 'fast-order',
        component: lazy(() => import('@modules/shipper/ShipperFastOrder')),
        key: 'fast-order',
        Icon: GiRunningNinja,
        name: 'Fast Order',
        fallback: AntdSkeleton
      },
      {
        key: 'order-list',
        component: lazy(() => import('@modules/shipper/ShipperOrderList')),
        path: 'order-list',
        name: 'Danh sách đơn hàng',
        Icon: AiOutlineShoppingCart,
        fallback: AntdSkeleton
      }
    ]
  }
];

export default routes;