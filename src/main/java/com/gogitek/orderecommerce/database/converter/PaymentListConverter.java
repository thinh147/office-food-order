package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface PaymentListConverter {
    String getOrderCode();

    Instant getPaymentTime();

    Double getDepositPercent();

    String getImagePayment();

    Double getDepositAmount();

    Double getRemainingAmount();

    Double getTotalAmount();

    Integer getStatus();

    Instant getFailedAt();

    Integer getErrorCode();

    Integer getOrderType();

    String getErrorText();
}
