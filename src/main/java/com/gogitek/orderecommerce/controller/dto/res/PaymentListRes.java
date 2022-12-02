package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.Instant;

@Getter
@Setter
public class PaymentListRes {
    private String orderCode;

    private Instant paymentTime;

    private Double depositPercent;

    private String imagePayment;

    private Double depositAmount;

    private Double remainingAmount;

    private Double totalAmount;

    private Integer status;

    private Integer orderType;

    private Instant failedAt;

    private Integer errorCode;

    private String errorText;
}
