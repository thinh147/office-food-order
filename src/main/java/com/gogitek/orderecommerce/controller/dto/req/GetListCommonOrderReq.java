package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetListCommonOrderReq {
    String key;
    String orderDateFrom;
    String orderDateTo;
    List<Integer> status;
    Integer page = 0;
    Integer size = 10;
}
