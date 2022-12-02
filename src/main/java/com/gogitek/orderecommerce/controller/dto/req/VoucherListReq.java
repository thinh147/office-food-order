package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoucherListReq {
    String code;
    Integer status;
    Integer page = 0;
    Integer size = 10;
}
