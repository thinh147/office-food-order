package com.gogitek.orderecommerce.service.mapper;

import com.gogitek.orderecommerce.controller.dto.req.FastOrderInput;
import com.gogitek.orderecommerce.controller.dto.res.FastOrderItemRes;
import com.gogitek.orderecommerce.controller.dto.res.FastOrderResForPrePay;
import com.gogitek.orderecommerce.controller.dto.res.OrderRes;
import com.gogitek.orderecommerce.database.converter.FastOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.GetFastOrderInforForPrePaymentConverter;
import com.gogitek.orderecommerce.database.entity.FastOrder;
import com.gogitek.orderecommerce.database.entity.FastOrderItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FastOrderMapper {
    FastOrderItem requestToEntity(FastOrderInput.FastOrderItem items);
    FastOrderItemRes converterToResponse(FastOrderItemConverter converter);
    FastOrderResForPrePay converterToResPrePay(GetFastOrderInforForPrePaymentConverter converter);

    OrderRes entityToResponse(FastOrder fastOrder);
}
