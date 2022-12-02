package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class OrderRes {

    private String orderCode;

    private Instant orderDate;

    private Instant dueDate;

    private Double totalNetPrice;

    private Double totalVat;

    private Double finalPrice;

    private Double discount;

    private String orderItem;

    private String listCart;

    private Integer orderType;
}
