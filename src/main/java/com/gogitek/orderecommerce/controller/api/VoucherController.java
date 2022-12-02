package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.dto.req.VoucherListReq;
import com.gogitek.orderecommerce.controller.dto.req.VoucherReq;
import com.gogitek.orderecommerce.controller.service.VoucherService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/vouchers")
@AllArgsConstructor
@Slf4j
public class VoucherController {
    VoucherService voucherService;

    @GetMapping()
    public Response getListVoucher(VoucherListReq req){
        try{
            return GogitekResponse.ok(voucherService.getListVoucher(req));
        }catch (Exception e){
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("", "","")));
        }
    }
}
