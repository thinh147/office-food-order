import { Skeleton } from "antd";
import React, { Suspense } from "react";
import { Outlet } from "react-router";

const Order = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Outlet />
    </Suspense>
  );
};

export default Order;
