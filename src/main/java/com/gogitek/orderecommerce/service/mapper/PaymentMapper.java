package com.gogitek.orderecommerce.service.mapper;

import com.gogitek.orderecommerce.controller.dto.res.PaymentListRes;
import com.gogitek.orderecommerce.database.converter.PaymentListConverter;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    PaymentListRes converterToEntity(PaymentListConverter converter);
}
