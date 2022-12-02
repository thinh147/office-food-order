package com.gogitek.orderecommerce.controller.dto.req;

import com.gogitek.orderecommerce.controller.dto.res.AddressDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleOrderInput {
    Integer pointInUsed;

    Double voucherPrice;

    AddressDto addressDto;

    CartRes inputData;
}
