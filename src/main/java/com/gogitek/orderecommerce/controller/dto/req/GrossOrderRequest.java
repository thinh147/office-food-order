package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GrossOrderRequest {
    List<String> orderCodes;
    Integer orderType;
}
