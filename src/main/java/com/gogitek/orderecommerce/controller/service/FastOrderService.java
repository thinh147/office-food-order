package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.FastOrderInput;
import com.gogitek.orderecommerce.controller.dto.req.GetListCommonOrderReq;
import com.gogitek.orderecommerce.controller.dto.req.UpdateOrderStatusReq;
import com.gogitek.orderecommerce.controller.dto.res.FastOrderResForPrePay;
import com.gogitek.orderecommerce.controller.dto.res.GetListCommonOrderRes;
import com.gogitek.orderecommerce.controller.dto.res.OrderRes;

import java.util.List;

public interface FastOrderService {
    OrderRes createFastOrder(FastOrderInput input);

    FastOrderResForPrePay getFastOrderDetail(String orderCode, Integer page, Integer size);

    PaginationPage<GetListCommonOrderRes> getListFastOrder(GetListCommonOrderReq req);

    Integer updateStatusFastOrder(UpdateOrderStatusReq req);

    void changeItemStatus(List<Long> ids, Integer updateType);

    List<OrderRes> findFastOrderByGrossCode(String code);
}
