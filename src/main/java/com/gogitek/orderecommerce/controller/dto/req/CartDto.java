package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDto {
    Long cartId;
    Long productId;
    Double price;
    Integer quantity;
    String image;
    String productName;
    String channelName;
    String productUrl;
    Double percentDiscount;
    String metaData;
    Integer orderType;
}
