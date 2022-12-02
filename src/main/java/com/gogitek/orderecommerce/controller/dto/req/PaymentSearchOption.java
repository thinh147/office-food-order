package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentSearchOption {
    String orderCode;
    Integer page;
    Integer size;
}
