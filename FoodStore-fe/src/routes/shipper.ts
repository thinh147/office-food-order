import { RouterConfig } from "@core/models/config";
import { lazy } from "react";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
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
        name: 'Danh sách đơn hàng',
        fallback: AntdSkeleton
      },
      {
        key: 'order-list',
        component: lazy(() => import('@modules/shipper/ShipperOrderList')),
        path: 'order-list',
        name: 'Lịch sử',
        Icon: AiOutlineShoppingCart,
        fallback: AntdSkeleton
      }
    ]
  }
];

export default routes;