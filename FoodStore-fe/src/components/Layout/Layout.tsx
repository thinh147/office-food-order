import React, { Suspense } from 'react';
import './index.scss';
interface Props {
  Component: React.LazyExoticComponent<() => JSX.Element>;
  fallback?: () => JSX.Element;
}

const Layout = ({ fallback, Component }: Props) => {
  const FallBackComponent = fallback ? fallback : () => <></>;
  return (
    <Suspense fallback={<FallBackComponent />}>
      <Component />
    </Suspense>
  )
}


export default Layout;
