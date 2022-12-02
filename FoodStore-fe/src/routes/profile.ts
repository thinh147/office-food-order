import AntdSkeleton from "@components/Skeleton/AntdSkeleton";
import { RouterConfig } from "@core/models/config";
import { Skeleton } from "antd";
import { lazy } from "react";
import { authGuard } from "./guard/authGuard";

const routes: RouterConfig[] = [
  {
    path: 'profile',
    guard: authGuard,
    component: lazy(() => import('@modules/UserProfile')),
    key: 'profile',
    children: [
      {
        key: 'profile-info',
        index: true,
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserProfileInformation }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-password',
        path: 'change-password',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofileChangePassword }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-bank-account',
        path: 'bank-account',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofileBankAccount }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-rank',
        path: 'rank',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofileRank }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-point',
        path: 'point',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofilePoint }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-collaborators',
        path: 'collaborators',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofileCollaborators }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-notification',
        path: 'notification',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofileNotification }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-payment',
        path: 'payment',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofilePayment }))),
        fallback: AntdSkeleton
      },
      {
        key: 'profile-purchase-management',
        path: 'transaction/:type',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofilePurchaseManager }))),
        fallback: AntdSkeleton
      },
      // {
      //   key: 'profile-password',
      //   path: 'change-password',
      //   component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofileChangePassword })))
      // },
      {
        key: 'profile-product-management',
        path: 'product-management',
        component: lazy(() => import('@modules/UserProfile').then(m => ({ default: m.UserprofileProductManagement }))),
        fallback: AntdSkeleton
      }
    ]
  },
];

export default routes;