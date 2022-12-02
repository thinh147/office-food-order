package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.controller.dto.req.*;
import com.gogitek.orderecommerce.controller.service.AddressService;
import com.gogitek.orderecommerce.controller.service.SaleOrderService;
import com.gogitek.orderecommerce.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;

@RestController
@Slf4j
@RequestMapping("/order")
@AllArgsConstructor
public class SaleOrderController {
    SaleOrderService saleOrderService;

    AddressService addressService;

    @PostMapping("/create")
    public Response createOrder(@RequestBody SaleOrderInput saleOrderReq) {
        try {
            return GogitekResponse.ok(saleOrderService.createNewSaleOrder(saleOrderReq));
        } catch (BadRequestException be) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Orders", be.getMessage(), "")));
        } catch (RuntimeException e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Orders", e.getMessage(), "")));
        } catch (Exception ex) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Orders", ex.getMessage(), "")));
        }
    }

    @GetMapping("/list-order")
    public Response getListOrder(@Valid GetListCommonOrderReq req) {
        try {
            return GogitekResponse.ok(saleOrderService.getListOrder(req));
        } catch (BadRequestException e) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Orders", e.getMessage(), "")));
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Orders", ex.getMessage(), "")));
        }
    }

    @GetMapping("/list-address")
    public Response getListAddress(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                   @RequestParam(name = "size", defaultValue = "20") Integer size) {
        try {
            return GogitekResponse.ok(addressService.getListAddress(page, size));
        } catch (BadRequestException e) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Orders", e.getMessage(), "")));
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Orders", ex.getMessage(), "")));
        }
    }

    @PostMapping("/create-address")
    public Response createAddress(@RequestBody AddressReq addressReq) {
        try {
            return GogitekResponse.ok(addressService.createAddress(addressReq));
        } catch (BadRequestException be) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("","","")));
        } catch (RuntimeException e) {
            return GogitekResponse.fail(ResultCodes.TOO_MANY_REQUEST, Collections.singletonList(new Error("","","")));
        } catch (Exception ex) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("","","")));
        }
    }

    @GetMapping("/detail")
    public Response getOrderDetail(@RequestParam(name = "code") String orderCode,
                                   @RequestParam(name = "page", defaultValue = "0") Integer page,
                                   @RequestParam(name = "size", defaultValue = "10") Integer size) {
        try {
            return GogitekResponse.ok(saleOrderService.getListSaleOrderItemByOrderCode(orderCode, page, size));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Order", e.getMessage(), "g")));
        }
    }

    @PostMapping("/update-address")
    public Response updateAddress(@RequestBody AddressReq addressReq) {
        try {
            return GogitekResponse.ok(addressService.updateAddress(addressReq));
        } catch (BadRequestException be) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("","","")));
        } catch (RuntimeException e) {
            return GogitekResponse.fail(ResultCodes.TOO_MANY_REQUEST, Collections.singletonList(new Error("","","")));
        } catch (Exception ex) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("","","")));
        }
    }

    @PostMapping("/delete-address/{id}")
    public Response updateAddress(@PathVariable Long id) {
        try {
            addressService.deleteAddress(id);
            return GogitekResponse.ok();
        } catch (BadRequestException be) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("","","")));
        } catch (RuntimeException e) {
            return GogitekResponse.fail(ResultCodes.TOO_MANY_REQUEST, Collections.singletonList(new Error("","","")));
        } catch (Exception ex) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("","","")));
        }
    }

    @PostMapping("/change-status")
    public Response updateStatusSaleOrder(@RequestBody UpdateOrderStatusReq req){
        try {
            return GogitekResponse.ok(saleOrderService.updateStatusSaleOrder(req));
        }catch (MultiLangException m){
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("SaleOrder", m.getMessage(), "")));
        }
    }

    @PostMapping("/detail/change-status")
    public Response changeStatusDetailOrder(@RequestBody UpdateItemStatusReq req){
        try{
            saleOrderService.changeItemStatus(req.getIds(), req.getUpdateType());
            return GogitekResponse.ok();
        }catch (Exception m){
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("SaleOrder", m.getMessage(), "")));
        }
    }
}
