package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.AddressReq;
import com.gogitek.orderecommerce.controller.dto.res.SaleOrderDto;
import com.gogitek.orderecommerce.database.converter.SaleOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.converter.TotalPriceOrderConverter;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import com.gogitek.orderecommerce.database.entity.SaleOrderItem;
import com.gogitek.orderecommerce.database.entity.common.Address;
import com.gogitek.orderecommerce.database.entity.common.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SaleOrderDao {
    PaginationPage<ListCommonOrderConverter> getListSaleOrder(String key, String orderDateFrom, String orderDateTo, List<Integer> status, Integer page, Integer size, Long userId);

    void saveOrder(SaleOrder saleOrder);

    void saveAllItem(Iterable<SaleOrderItem> items);

    PaginationPage<SaleOrderItemConverter> getSaleOrderDetail(String orderCode, Integer page, Integer size);

    TotalPriceOrderConverter getTotalPriceForOrderDetail(String code);

    SaleOrder findSaleOrderByCode(String code);

    List<SaleOrderItem> findSaleOrderItemByCode(String code);

    Page<SaleOrder> findAllSaleOrderByPage(Pageable pageable);

    void saveAll(Iterable<SaleOrder> saleOrders);

    List<SaleOrder> findByListCodes(List<String> orderCodes);

    List<SaleOrderItem> findByListIds(List<Long> ids);

    List<SaleOrder> findByGrossCode(String grossCode);
}
