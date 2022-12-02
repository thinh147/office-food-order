package com.gogitek.orderecommerce.controller.dto.res;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class SaleOrderDetailForPrePay {
    Double finalPrice;
    Double vatPrice;
    Double discountPrice;
    Double netPrice;
    Double depositPercent;
    Double depositPrice;
    Double remainingPrice;
    Instant dueDate;
    String code;
    String address;
    Long addressId;
    Integer status;
    Integer orderType;
    PaginationPage<SaleOrderItemRes> itemDetail = new PaginationPage<>();
}
