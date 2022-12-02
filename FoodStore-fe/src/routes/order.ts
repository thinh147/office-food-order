import AntdSkeleton from "@components/Skeleton/AntdSkeleton"
import { RouterConfig } from "@core/models/config"
import { lazy } from "react"
import { noAdminGuard } from "./guard/noAdminGaurd"

const routes: RouterConfig[] = [
  {
    path: 'order',
    component: lazy(() => import('@modules/order')),
    key: 'order',
    guard: noAdminGuard,
    children: [
      {
        key: 'order-confirm',
        index: true,
        component: lazy(() => import('@modules/order').then(m => ({ default: m.OrderConfirmation }))),
        fallback: AntdSkeleton
      },
      {
        key: 'address',
        path: 'address',
        component: lazy(() => import('@modules/order').then(m => ({ default: m.OrderAddress }))),
        fallback: AntdSkeleton
      },
      {
        key: 'fast-order',
        path: 'fast-order',
        component: lazy(() => import('@modules/order').then(m => ({ default: m.OrderByRequest }))),
        fallback: AntdSkeleton
      },
      {
        key: 'tracking',
        path: 'tracking/:orderId',
        component: lazy(() => import('@modules/order').then(m => ({ default: m.OrderTracking }))),
        fallback: AntdSkeleton
      },
      {
        key: 'payment',
        path: 'payment/:orderId',
        component: lazy(() => import('@modules/order').then(m => ({ default: m.Payment }))),
        fallback: AntdSkeleton
      },
      {
        key: 'thanks',
        path: 'thanks/:orderId',
        component: lazy(() => import('@modules/order').then(m => ({ default: m.OrderThanks }))),
        fallback: AntdSkeleton
      }
    ]
  },
]

export default routes