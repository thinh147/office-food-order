package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface FastOrderItemConverter {
    Long getId();
    Instant getCompletedDate();
    String getUserEmail();
    Long getUserId();
    String getUserPhone();
    Double getDiscount();
    Double getItemFinalPrice();
    Instant getOrderDate();
    Integer getStatus();
    Instant getUpdatedAt();
    String getFastOrderCode();
    Integer getQuantity();
    Integer getPaymentStatus();
    Double getPercentDiscount();
    String getPaymentImage();
    Integer getOrderType();
    String getColor();
    String getSize();
    String getUserName();

    String getProductUrl();

    Double getTotalNetPrice();
    Double getTotalVATAmount();

    String getNote();

    Double getDepositAmount();
            Double getDepositPercent();
}
