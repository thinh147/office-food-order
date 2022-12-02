package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.dto.req.ConfirmDto;
import com.gogitek.orderecommerce.controller.dto.req.PaymentReq;
import com.gogitek.orderecommerce.controller.dto.req.PaymentSearchOption;
import com.gogitek.orderecommerce.controller.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;

@RestController
@RequestMapping("/payment")
@AllArgsConstructor
@Slf4j
public class PaymentController {
    PaymentService paymentService;

    @PostMapping("/create")
    public Response createPayment(@RequestBody PaymentReq req) throws GogitekException {
        try {
            paymentService.createPayment(req);
            return GogitekResponse.ok();
        } catch (GogitekException ge) {
            throw ge;
        } catch (Exception e) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Payment", e.getMessage(), "")));
        }
    }

    @GetMapping()
    public Response getListPayment(@Valid PaymentSearchOption option) {
        try {
            return GogitekResponse.ok(paymentService.getListPayment(option));
        } catch (Exception e) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Payment", e.getMessage(), "")));
        }
    }

    @PostMapping("/confirm")
    public Response confirmPayment(@RequestBody ConfirmDto req) throws Exception {
        paymentService.confirm(req.getOrderCode());
        return GogitekResponse.ok();
    }
}
