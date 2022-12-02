package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.controller.dto.res.OrderRes;

import java.util.List;

public interface ShipperService {
    List<OrderRes> findListOrderForShipper();

    void approveSaleOrder(Long orderId);
}
