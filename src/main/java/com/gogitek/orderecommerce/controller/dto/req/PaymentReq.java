package com.gogitek.orderecommerce.controller.dto.req;

import com.gogitek.orderecommerce.controller.dto.res.OrderRes;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class PaymentReq {
    @NotNull(message = "error.notNull")
    String paymentImage;

    Double depositPercent;

    Double depositAmount;

    OrderRes paymentInput;

    Integer orderType;
}
