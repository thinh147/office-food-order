package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.CartItemRes;
import com.gogitek.orderecommerce.controller.dto.req.CartRes;
import com.gogitek.orderecommerce.controller.dto.req.GrossOrderCartRequest;

import java.util.List;

public interface CartService {

    CartItemRes saveToCart(CartDto cartDto) throws MultiLangException;

    CartRes getListProductInCart();

    void deleteCart(Long productId) throws MultiLangException;

    void deleteCartByCurrentUser(Long userId, Integer orderType) throws MultiLangException;

    CartItemRes grossCartOrder(GrossOrderCartRequest req);
}
