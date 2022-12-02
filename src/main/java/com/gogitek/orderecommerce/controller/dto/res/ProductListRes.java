package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ProductListRes {
    Long id;
    String name;
    String productUrl;
    String affiliateUrl;
    String imageUrl;
    Double price;
    Double percentDiscount;
    String description;
    String channel;
    Long subCategoryId;
    String subCategoryName;
    String trademark;
    Instant updatedAt;
    String metaData;
}
