package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReq {
    Long id;
    //product base
    String code;
    String name;
    String affiliateUrl;
    String channel;
    String description;
    String image;
    Double percentDiscount;
    Double price;
    String productUrl;
    String trademark;
    Long categoryId;
    String categoryName;
    String metaDataReqs;
}
