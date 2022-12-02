package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface VoucherConverter {
    Long getId();

    String getCode() ;

    Double getDiscount() ;

    Double getMinValueToUse();

    Double getMaxPriceDiscount();

    Instant getStartDate();

    Instant getDueDate() ;

    Long getProductId();

    Long getQuantity();

    Long getQuantityRemaining();

    Integer getIsActive();

    String getChannel();

    Integer getDiscountType();
}
