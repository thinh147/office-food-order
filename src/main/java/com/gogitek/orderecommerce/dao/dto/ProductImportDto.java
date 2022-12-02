package com.gogitek.orderecommerce.dao.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.Instant;

@Getter
@Setter
public class ProductImportDto {

    private String name;

    private String productCode;

    private String description;

    private String productUrl;

    private String affiliateUrl;

    private String imageUrl;

    private String price;

    private String percentDiscount;

    private String channel;

    private String trademark;

    private Long category;

    private String metadata;
}
