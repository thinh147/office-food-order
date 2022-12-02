package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface TotalPriceOrderConverter {
    Double getFinalPrice();
    Double getVatPrice();
    Double getDiscountPrice();
    Double getNetPrice();
    Double getDepositPercent();
    Double getDepositPrice();
    Long getAddressId();
    String getAddress();
    Instant getDueDate();
    Double getRemainingPrice();
    String getCode();
    Integer getStatus();
    Integer getOrderType();
}
