import { RouterConfig } from "@core/models/config";
import { lazy } from "react";
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineTransaction } from "react-icons/ai";
import { GiClothes } from 'react-icons/gi';
import { FaTags } from 'react-icons/fa';
import { adminGuard } from "./guard/adminGuard";
import AntdSkeleton from "@components/Skeleton/AntdSkeleton";

const routes: RouterConfig[] = [
  {
    path: 'admin',
    component: lazy(() => import('@components/LayoutAdmin')),
    guard: adminGuard,
    key: 'admin',
    children: [
      {
        key: 'dashboard',
        component: lazy(() => import('@modules/admin/AdminDashboard')),
        path: 'dashboard',
        name: 'Dashboard',
        Icon: AiOutlineDashboard,
        fallback: AntdSkeleton
      },
      {
        key: 'order-list',
        component: lazy(() => import('@modules/admin/AdminOrderList')),
        path: 'order-list',
        name: 'Danh sách đơn hàng',
        Icon: AiOutlineShoppingCart,
        fallback: AntdSkeleton
      },
      {
        key: 'product-admin',
        component: lazy(() => import('@modules/admin/AdminProduct')),
        path: 'product',
        Icon: GiClothes,
        name: 'Sản Phẩm',
        fallback: AntdSkeleton
      },
      {
        key: 'admin-transaction-history',
        component: lazy(() => import('@modules/admin/AdminTransactionHistory')),
        path: 'transaction-history',
        name: 'Lịch sử giao dịch',
        Icon: AiOutlineTransaction,
        fallback: AntdSkeleton
      },
      {
        key: 'admin-discount',
        component: lazy(() => import('@modules/admin/AdminDiscount')),
        path: 'admin-discount',
        Icon: FaTags,
        name: 'Giảm giá',
        fallback: AntdSkeleton
      }
    ]
  }
];

export default routes;