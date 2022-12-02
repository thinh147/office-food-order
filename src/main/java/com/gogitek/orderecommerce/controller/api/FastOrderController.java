package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.dto.req.FastOrderInput;
import com.gogitek.orderecommerce.controller.dto.req.GetListCommonOrderReq;
import com.gogitek.orderecommerce.controller.dto.req.UpdateItemStatusReq;
import com.gogitek.orderecommerce.controller.dto.req.UpdateOrderStatusReq;
import com.gogitek.orderecommerce.controller.service.FastOrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;

@RestController
@RequestMapping("/fast-orders")
@AllArgsConstructor
@Slf4j
public class FastOrderController {
    FastOrderService fastOrderService;

    @PostMapping("/create")
    public Response createFastOrder(@RequestBody FastOrderInput input) {
        try {
            return GogitekResponse.ok(fastOrderService.createFastOrder(input));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("FastOrder", e.getMessage(), "")));
        }
    }

    @GetMapping()
    public Response getListFastOrder(@Valid GetListCommonOrderReq req) {
        try {
            return GogitekResponse.ok(fastOrderService.getListFastOrder(req));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("FastOrder", e.getMessage(), "")));
        }
    }

    @GetMapping("/detail")
    public Response getFastOrderDetail(@RequestParam(name = "code") String orderCode,
                                       @RequestParam(name = "page", defaultValue = "0") Integer page,
                                       @RequestParam(name = "size", defaultValue = "10") Integer size) {
        try {
            return GogitekResponse.ok(fastOrderService.getFastOrderDetail(orderCode, page, size));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("FastOrder", e.getMessage(), "Check line 48 int fastOrderController")));
        }
    }

    @PostMapping("change-status")
    public Response changeStatusFastOrder(@RequestBody UpdateOrderStatusReq req) throws RuntimeException{
        try {
            return GogitekResponse.ok(fastOrderService.updateStatusFastOrder(req));
        } catch (RuntimeException e) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("FastOrder", e.getMessage(), "")));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("FastOrder", e.getMessage(), "")));
        }
    }

    @PostMapping("/detail/change-status")
    public Response changeItemStatus(@RequestBody UpdateItemStatusReq req){
        try{
            fastOrderService.changeItemStatus(req.getIds(), req.getUpdateType());
            return GogitekResponse.ok();
        }catch (Exception e){
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("FastOrderItem", e.getMessage(), "")));
        }
    }
}
