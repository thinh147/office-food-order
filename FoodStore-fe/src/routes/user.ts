import AntdSkeleton from "@components/Skeleton/AntdSkeleton";
import { RouterConfig } from "@core/models/config";
import { lazy } from "react";
import { noAdminGuard } from "./guard/noAdminGaurd";
import orderRouter from './order';
import profileRouter from './profile';

const routes: RouterConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@components/LayoutHomepage')),
    key: 'user',
    children: [
      ...orderRouter,
      ...profileRouter,
      {
        path: 'product/:page',
        key: 'product',
        component: lazy(() => import('@modules/product')),
        fallback: AntdSkeleton,
        guard: noAdminGuard,
      },
      {
        path: 'product/:page/:productId',
        component: lazy(() => import('@modules/product').then(m => ({
          default: m.ProductDetail
        }))),
        key: 'productDetail',
        fallback: AntdSkeleton,
        guard: noAdminGuard,
      },
      {
        component: lazy(() => import('@modules/home')),
        index: true,
        key: 'home',
        fallback: AntdSkeleton
      },
    ]
  },

];

export default routes;