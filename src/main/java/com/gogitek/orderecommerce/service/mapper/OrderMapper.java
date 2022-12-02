package com.gogitek.orderecommerce.service.mapper;

import com.gogitek.orderecommerce.controller.dto.res.GetListCommonOrderRes;
import com.gogitek.orderecommerce.controller.dto.res.SaleOrderDetailForPrePay;
import com.gogitek.orderecommerce.controller.dto.res.SaleOrderItemRes;
import com.gogitek.orderecommerce.controller.dto.res.OrderRes;
import com.gogitek.orderecommerce.database.converter.SaleOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.converter.TotalPriceOrderConverter;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderRes entityToRes(SaleOrder saleOrder);

    GetListCommonOrderRes converterToResponse(ListCommonOrderConverter converter);

    SaleOrderItemRes converterToItemResponse(SaleOrderItemConverter converter);

    SaleOrderDetailForPrePay converterToDetailResponse(TotalPriceOrderConverter converter);
}
