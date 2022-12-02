package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.CartItemRes;
import com.gogitek.orderecommerce.controller.dto.req.CartRes;
import com.gogitek.orderecommerce.controller.dto.req.GrossOrderCartRequest;
import com.gogitek.orderecommerce.controller.service.CartService;
import com.gogitek.orderecommerce.dao.CartDao;
import com.gogitek.orderecommerce.database.entity.common.Cart;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    CartDao cartDao;

    @Override
    public CartItemRes saveToCart(CartDto cartDto) throws MultiLangException {
        try {
            if(cartDto.getCartId() == null) cartDto.setCartId(-1L);
            Cart cart = cartDao.saveProductToCart(cartDto);
            CartItemRes res = new CartItemRes();
            res.setCartId(cart.getId());
            res.setProductId(cart.getProductId());
            res.setImage(cart.getImage());
            res.setQuantity(cart.getQuantity());
            res.setProductName(cart.getProductName());
            res.setYenPrice(cart.getTotalPrice());
            res.setVndPrice(cart.getTotalPrice());
            res.setMetaData(cart.getMetaData());
            res.setChannel(cart.getChannelName());
            res.setPercentDiscount(cart.getPercentDiscount());
            res.setOrderType(cart.getOrderType());
            return res;
        }catch (MultiLangException e){
            throw new MultiLangException(ResultCodes.CANT_SAVE);
        }
    }

    @Override
    public CartRes getListProductInCart(){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        if(user == null) throw new MultiLangException(ResultCodes.CART_USER_NOT_EMPTY);
        return cartDao.findProductInCart(user.getId());
    }

    @Override
    public void deleteCart(Long cartId) throws MultiLangException{
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        cartDao.delete(user.getId(), cartId);
    }

    @Override
    public void deleteCartByCurrentUser(Long userId, Integer orderType) throws MultiLangException {
        cartDao.deleteByUserId(userId, orderType);
    }

    @Override
    public CartItemRes grossCartOrder(GrossOrderCartRequest req) {
        return null;
    }
}
