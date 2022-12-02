package com.gogitek.orderecommerce.service.mapper;

import com.gogitek.orderecommerce.controller.dto.PropertyDto;
import com.gogitek.orderecommerce.controller.dto.res.AddressDto;
import com.gogitek.orderecommerce.controller.dto.res.GetListVoucherRes;
import com.gogitek.orderecommerce.database.converter.VoucherConverter;
import com.gogitek.orderecommerce.database.entity.PropertySetting;
import com.gogitek.orderecommerce.database.entity.common.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommonMapper {
    PropertyDto propertyEntityToDto(PropertySetting entity);
    Address addressDtoToEntity(AddressDto dto);
    GetListVoucherRes converterToRes(VoucherConverter converter);
}
