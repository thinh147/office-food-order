package com.gogitek.orderecommerce.dao.daoimp;

import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.CartItemRes;
import com.gogitek.orderecommerce.controller.dto.req.CartRes;
import com.gogitek.orderecommerce.dao.CartDao;
import com.gogitek.orderecommerce.database.entity.common.Cart;
import com.gogitek.orderecommerce.database.repository.CartRepo;
import com.gogitek.orderecommerce.service.mapper.CartMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class CartDaoImpl implements CartDao {
    CartRepo cartRepo;

    CartMapper cartMapper;

    @Override
    @Transactional
    public Cart saveProductToCart(CartDto cartDto) {
        try{
            UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            Cart cart;
            Optional<Cart> cartOpt = cartRepo.findById(cartDto.getCartId());
            if (cartOpt.isEmpty()) {
                cart = createNewCart(cartDto);
                cart.setUserId(user.getId());
            } else {
                cart = updateCart(cartOpt, cartDto);
            }
            cartRepo.save(cart);
            return cart;
        }catch (Exception ex){
            log.error(ex.getMessage(), ex);
            throw new MultiLangException(ResultCodes.CANT_SAVE);
        }
    }

    private Cart createNewCart(CartDto cartDto){
        Cart cart = cartMapper.dtoToEntity(cartDto);
        cart.setCreatedAt(Instant.now());
        cart.setUpdatedAt(Instant.now());
        cart.setOrderType(cartDto.getOrderType());
        if (cartDto.getPrice() == null || cartDto.getQuantity() == null) cart.setTotalPrice(null);
        else cart.setTotalPrice(cartDto.getPrice());
        return cart;
    }

    private Cart updateCart(Optional<Cart> cartOpt, CartDto cartDto){
        Cart cart = cartOpt.get();

        double totalPrice = 0d;

        if (cartDto.getPrice() == null || cartDto.getQuantity() == null) cart.setTotalPrice(null);
        else {
            totalPrice += cartDto.getPrice();
            cart.setTotalPrice(cartDto.getPrice());
        }
        cart.setTotalPrice(totalPrice);
        cart.setMetaData(cartDto.getMetaData());
        cart.setQuantity(cartDto.getQuantity());
        cart.setUpdatedAt(Instant.now());
        cart.setUpdatedAt(Instant.now());
        return cart;
    }

    @Override
    @Transactional
    public CartRes findProductInCart(Long userId){
        try {
            CartRes response = new CartRes();
            List<Cart> cart = cartRepo.findByUserId(userId);
            List<CartItemRes> items = cart.stream().map(item -> {
                CartItemRes res = cartMapper.entityToItemRes(item);
                res.setCartId(item.getId());
                res.setImage(item.getImage());
                res.setVndPrice(item.getTotalPrice());
                res.setYenPrice(item.getTotalPrice());
                res.setChannel(item.getChannelName());
                res.setPercentDiscount(item.getPercentDiscount());
                res.setOrderType(item.getOrderType());
                return res;
            }).collect(Collectors.toList());
            response.getItems().addAll(items);
            response.setTotalItem(items.size());
            double price = 0d;
            for(CartItemRes item : items){
                price += item.getVndPrice()*item.getQuantity();
            }
            response.setTotalPriceVnd(price);
            response.setTotalPriceYen(price);
            return response;
        }catch (Exception e){
            log.error(e.getMessage(), e);
            return new CartRes();
        }
    }

    @Override
    public void delete(Long userId, Long cartId) {
        Optional<Cart> cartOpt = cartRepo.findByCartIdAndUserId(cartId, userId);
        if (cartOpt.isEmpty()) throw new MultiLangException(ResultCodes.CANT_SAVE);
        Cart cart = cartOpt.get();
        cartRepo.delete(cart);
    }

    @Override
    public void deleteByUserId(Long userId, Integer orderType) {
        try {
            cartRepo.deleteAllByUserId(userId, orderType);
        }catch (Exception e){
            log.error(e.getMessage(),e);
            throw new MultiLangException(ResultCodes.CANT_DELETE);
        }
    }
}
