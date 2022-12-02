package com.gogitek.orderecommerce.controller.api;


import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.controller.dto.req.AlterProductReq;
import com.gogitek.orderecommerce.controller.dto.req.AlterRequest;
import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.GrossOrderCartRequest;
import com.gogitek.orderecommerce.controller.service.CartService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/cart")
public class CartController {

    CartService cartService;
    @PostMapping("/add-to-cart")
    public Response addProductToCart(@RequestBody CartDto cartDtoList){
        try{
            return GogitekResponse.ok(cartService.saveToCart(cartDtoList));
        }catch (MultiLangException me){
            return GogitekResponse.fail(ResultCodes.INVALID_LOGIN_INFO, Collections.singletonList(new Error("Product", me.getMessage(), "")));
        }catch (Exception e){
            log.error(e.getMessage(),e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product", e.getMessage(), "")));
        }
    }

    @GetMapping("/get-cart")
    public Response getListCart(){
        try{
            return GogitekResponse.ok(cartService.getListProductInCart());
        }catch (MultiLangException me){
            return GogitekResponse.fail(ResultCodes.INVALID_LOGIN_INFO, Collections.singletonList(new Error("Product", me.getMessage(), "")));
        }catch (Exception e){
            log.error(e.getMessage(),e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product", e.getMessage(), "")));
        }
    }

    @PostMapping("/delete")
    public Response deleteCart(@RequestBody AlterRequest request){
        try{
            cartService.deleteCart(request.getId());
            return GogitekResponse.ok();
        }catch (Exception e){
            log.error(e.getMessage(),e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product", e.getMessage(), "")));
        }
    }
}
