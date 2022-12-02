package com.gogitek.orderecommerce.controller.dto.req;

import com.gogitek.orderecommerce.controller.dto.res.AddressDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FastOrderInput {
    Double pointUsed;
    Double voucherPrice;
    Double netPrice;
    Double finalPrice;
    Double vatPrice;
    AddressDto address;
    List<FastOrderItem> items;

    @Getter
    @Setter
    public static class FastOrderItem{
        private String productUrl;
        private String color;
        private String size;
        private Integer quantity;
        private Double netPrice;
        private Double vatPrice;
        private Double percentDiscount;
        private Double discountPrice;
        private String note;
        private Double finalPrice;
    }
}
