package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class GetListVoucherRes {
    private Long id;

    private String code;

    private Double discount;

    private Double minValueToUse;

    private Double maxPriceDiscount;

    private Instant startDate;

    private Instant dueDate;

    private Long productId;

    private Long quantity;

    private Long quantityRemaining;

    private Integer isActive;

    private String channel;

    private Integer discountType;
}
