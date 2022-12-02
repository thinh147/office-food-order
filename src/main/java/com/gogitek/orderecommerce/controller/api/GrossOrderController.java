package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.controller.dto.req.GrossOrderCartRequest;
import com.gogitek.orderecommerce.controller.dto.req.GrossOrderRequest;
import com.gogitek.orderecommerce.service.impl.service.GrossOrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/gross-orders")
@Slf4j
@AllArgsConstructor
public class GrossOrderController {
    GrossOrderService grossOrderService;
    @PostMapping("/create")
    public Response addOrderToCart(@RequestBody GrossOrderCartRequest req){
        try {
            return GogitekResponse.ok(grossOrderService.createNewGrossOrder(req));
        }catch (MultiLangException me){
            return GogitekResponse.fail(ResultCodes.INVALID_LOGIN_INFO, Collections.singletonList(new Error("Product", me.getMessage(), "")));
        }catch (Exception e){
            log.error(e.getMessage(),e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product", e.getMessage(), "")));
        }
    }

    @PostMapping("/admin/create")
    public Response createGrossOrderAdmin(@RequestBody GrossOrderRequest request){
        try {
            return GogitekResponse.ok(grossOrderService.createGrossOrder(request));
        }catch (MultiLangException me){
            return GogitekResponse.fail(ResultCodes.INVALID_LOGIN_INFO, Collections.singletonList(new Error("Gross", me.getMessage(), "")));
        }catch (Exception e){
            log.error(e.getMessage(),e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Gross", e.getMessage(), "")));
        }
    }

    @GetMapping()
    public Response getListGrossOrder(@RequestParam(name = "code") String orderCode,
                                      @RequestParam(name = "orderType", defaultValue = "1") Integer orderType){
        try {
            return GogitekResponse.ok(grossOrderService.findGrossOrderByCode(orderCode, orderType));
        }catch (MultiLangException me){
            return GogitekResponse.fail(ResultCodes.INVALID_LOGIN_INFO, Collections.singletonList(new Error("Gross", me.getMessage(), "")));
        }catch (Exception e){
            log.error(e.getMessage(),e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Gross", e.getMessage(), "")));
        }
    }
}
