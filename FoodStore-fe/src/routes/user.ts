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
      {
        path: '/about-us',
        component: lazy(() => import('@components/AboutUs')),
        key: 'aboutUs',
        fallback: AntdSkeleton
      },
      {
        path: '/information-privacy-policy',
        component: lazy(() => import('@components/PrivacyPolicy')),
        key: 'aboutUs',
        fallback: AntdSkeleton
      },
      {
        path: '/payment-policy',
        component: lazy(() => import('@components/PaymentPolicy')),
        key: 'aboutUs',
        fallback: AntdSkeleton
      },
      {
        path: '/delivery-policy',
        component: lazy(() => import('@components/DeliveryPolicy')),
        key: 'aboutUs',
        fallback: AntdSkeleton
      },
      {
        path: '/contact-us',
        component: lazy(() => import('@components/ContactUs')),
        key: 'aboutUs',
        fallback: AntdSkeleton
      }
    ]
  },
  

];

export default routes;