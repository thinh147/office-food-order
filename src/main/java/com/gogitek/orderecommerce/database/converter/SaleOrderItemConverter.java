package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface SaleOrderItemConverter {
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
    String getSaleOrderCode();
    String getProductId();
    String getChannel();
    String getConfig();
    String getOption();
    Integer getQuantity();
    String getProductImage();
    String getProductName();
    Integer getPaymentStatus();
    String getPaymentImage();
    Integer getOrderType();
}
