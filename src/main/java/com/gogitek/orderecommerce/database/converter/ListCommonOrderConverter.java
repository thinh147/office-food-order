package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface ListCommonOrderConverter {
    String getId();
    String getCustomerName();
    String getCustomerEmail();
    String getCustomerPhone();
    Integer getStatus();
    String getCode();
    Double getTotalPrice();
    Instant getOrderDate();
    Double getDepositPrice();
    Integer getPaymentStatus();
    String getAddress();
    String getPaymentDate();
    String getUpdatedDate();
    Double getDepositPercent();
    Double getDepositAmount();
    Double getRemainingAmount();
}
