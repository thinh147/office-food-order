package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class FastOrderItemRes {
    Long id;
    Instant completedDate;
    String userEmail;
    Long userId;
    String userPhone;
    String userName;
    Double discount;
    Double itemFinalPrice;
    Instant orderDate;
    Integer status;
    Instant updatedAt;
    String fastOrderCode;
    Integer quantity;
    Integer paymentStatus;
    Double percentDiscount;
    String paymentImage;
    Integer orderType;
    String color;
    String size;
    String productUrl;
    Double totalNetPrice;
    Double totalVATPrice;
    String note;
    Double depositAmount;
    Double depositPercent;
}
