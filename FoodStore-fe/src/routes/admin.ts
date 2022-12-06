import { RouterConfig } from "@core/models/config";
import { lazy } from "react";
import { AiOutlineDashboard, AiOutlineMoneyCollect, AiOutlineShoppingCart, AiOutlineTransaction, AiFillSetting } from "react-icons/ai";
import { GiClothes, GiRunningNinja } from 'react-icons/gi';
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
      },
      {
        key: 'admin-settings',
        component: lazy(() => import('@modules/admin/AdminPropertySetting')),
        path: 'settings',
        Icon: AiFillSetting,
        name: 'Cài đặt',
        fallback: AntdSkeleton
      }
    ]
  }
];

export default routes;