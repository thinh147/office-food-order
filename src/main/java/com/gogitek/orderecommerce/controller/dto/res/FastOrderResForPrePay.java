package com.gogitek.orderecommerce.controller.dto.res;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class FastOrderResForPrePay {
    Double finalPrice;
    Double vatPrice;
    Double discountPrice;
    Double netPrice;
    Double depositPercent;
    Double depositPrice;
    Double remainingPrice;
    Instant dueDate;
    Instant createdAt;
    String code;
    String address;
    Long addressId;
    Integer status;
    Integer orderType;
    PaginationPage<FastOrderItemRes> itemDetail = new PaginationPage<>();
}
