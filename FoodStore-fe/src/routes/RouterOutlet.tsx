import Layout from '@components/Layout';
import { RouterConfig } from '@core/models/config';
import React from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';

interface Props {
  baseUrl?: string;
  routes: RouterConfig[];
}

const RouterOutlet = ({ routes, baseUrl }: Props) => {
  return (
    <Routes>
      {routes
        .map(route => {
          const { guard } = route;
          const el = renderRoute(route, baseUrl)
          return guard ? (guard(route) ? el : null) : el;
        })}
    </Routes>
  )
}
export default RouterOutlet;

const resolvePath = (baseUrl?: string) => (path: RouteProps['path']) => `${baseUrl ?? ''}${path ?? ''}`;

const renderRoute = (route: RouterConfig, baseUrl?: string) => {
  const { fallback, path, guard, component: Component, children, ...props } = route;
  const el = Component && (
    <Route {...props} path={resolvePath(baseUrl)(path)}
      element={<Layout Component={Component} fallback={fallback} />}>
      {children && children.map(prop => renderRoute(prop, baseUrl))}
    </Route>
  );
  return guard ? (guard(route) ? el : null) : el;
}