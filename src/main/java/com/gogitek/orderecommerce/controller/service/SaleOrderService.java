package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.*;
import com.gogitek.orderecommerce.controller.dto.res.*;

import java.util.List;

public interface SaleOrderService {
    OrderRes createNewSaleOrder(SaleOrderInput input);

    PaginationPage<GetListCommonOrderRes> getListOrder(GetListCommonOrderReq req) throws Exception;

    List<OrderRes> getListOrderByGrossCode(String code);
    SaleOrderDetailForPrePay getListSaleOrderItemByOrderCode(String orderCode, Integer page, Integer size);

    Integer updateStatusSaleOrder(UpdateOrderStatusReq req);

    void rejectSaleOrderAfterDueDate();

    void changeItemStatus(List<Long> ids, Integer updateType);
}
