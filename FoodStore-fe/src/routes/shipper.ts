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
        component: lazy(() => import('@modules/shipper/ShipperFastOrder')),
        key: 'dashboard',
        Icon: AiOutlineDashboard,
        name: 'Bảng điều khiển',
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