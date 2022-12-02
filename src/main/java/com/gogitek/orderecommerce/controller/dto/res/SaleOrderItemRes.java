package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class SaleOrderItemRes {
    Long id;
    Instant completedDate;
    String userEmail;
    Long userId;
    String userPhone;
    Double discount;
    Double itemFinalPrice;
    Instant orderDate;
    Integer status;
    Instant updatedAt;
    String saleOrderCode;
    String productId;
    String channel;
    String config;
    String option;
    Integer quantity;
    String productImage;
    Integer paymentStatus;
    String paymentImage;
    Integer orderType;
    String productName;
}
