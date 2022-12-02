package com.gogitek.orderecommerce.service.mapper;

import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.CartItemRes;
import com.gogitek.orderecommerce.database.entity.common.Cart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    Cart dtoToEntity(CartDto dto);

    CartDto entityToDto(Cart entity);

    CartItemRes entityToItemRes(Cart entity);

    Cart itemResToEntity(CartItemRes res);
}
