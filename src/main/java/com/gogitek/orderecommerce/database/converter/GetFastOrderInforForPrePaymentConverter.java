package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface GetFastOrderInforForPrePaymentConverter {
    String getCode();
    String getAddress();
    Long getAddressId();
    Double getRemainingPrice();
    Double getDepositPrice();
    Double getDepositPercent();
    Integer getStatus();
    Instant getDueDate();
    Instant getCreatedAt();
    Long getPointInUsed();
    Double getVoucherPrice();
    Double getNetPrice();
    Double getVatPrice();
    Double getFinalPrice();

    Integer getOrderType();
}
