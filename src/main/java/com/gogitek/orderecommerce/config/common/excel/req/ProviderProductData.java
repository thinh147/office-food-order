package com.gogitek.orderecommerce.config.common.excel.req;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class ProviderProductData {
    private Integer index;
    private String name;
    private String description;
    private String link;
    private String affiliateUrl;
    private String imageUrl;
    private Double price;
    private String trademark;
    private String category;
    private String metaData;
}
