package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.CartItemRes;
import com.gogitek.orderecommerce.controller.dto.req.CartRes;
import com.gogitek.orderecommerce.database.entity.common.Cart;

import java.util.List;

public interface CartDao {

    Cart saveProductToCart(CartDto cartDto);

    CartRes findProductInCart(Long userId);

    void delete(Long userId, Long cartId);

    void deleteByUserId(Long userId, Integer orderType);
}
