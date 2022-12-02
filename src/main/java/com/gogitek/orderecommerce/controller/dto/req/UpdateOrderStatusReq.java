package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderStatusReq {
    String orderCode;
    Integer updateType;
}
