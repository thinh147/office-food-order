package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.GetListCommonOrderReq;
import com.gogitek.orderecommerce.controller.dto.res.FastOrderItemRes;
import com.gogitek.orderecommerce.database.converter.FastOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.GetFastOrderInforForPrePaymentConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.entity.FastOrder;
import com.gogitek.orderecommerce.database.entity.FastOrderItem;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface FastOrderDao {
    void save(FastOrder fastOrder);

    void saveItems(List<FastOrderItem> items);

    void saveAll(Collection<FastOrder> fastOrders);

    GetFastOrderInforForPrePaymentConverter getInformationForPrePaymentByCode(String code);

    PaginationPage<FastOrderItemConverter> getListDetailFastOrderItemByCode(String code, Integer page, Integer size);

    List<FastOrder> findFastOrderByCodeIn(List<String> orderCodes);

    List<FastOrderItem> findFastOrderItemByCode(String code);

    Optional<FastOrder> findFastOrderByCode(String code);

    PaginationPage<ListCommonOrderConverter> getListFastOrder(GetListCommonOrderReq req, Long userId);

    List<FastOrderItem> findListFastOrderItemByIdsIn(List<Long> ids);

    List<FastOrder> findByGrossCode(String grossCode);
}
