package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.service.ShipperService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipper")
@AllArgsConstructor
public class ShipperController {
    ShipperService shipperService;

    @GetMapping()
    public Response getListVisibleOrderForShipper(){
        return GogitekResponse.ok(shipperService.findListOrderForShipper());
    }

    @PostMapping("/approve/{orderId}")
    public Response acceptOrderByShipper(@PathVariable Long orderId){
        shipperService.approveSaleOrder(orderId);
        return GogitekResponse.ok();
    }
}
