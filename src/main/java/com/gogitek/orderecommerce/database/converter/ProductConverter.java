package com.gogitek.orderecommerce.database.converter;

import java.time.Instant;

public interface ProductConverter {
    Long getId();
    String getName();
    String getProductUrl();
    String getAffiliateUrl();
    String getImageUrl();
    Double getPercentDiscount();
    String getChannel();
    Long getSubCategoryId();
    String getSubCategoryName();
    Instant getUpdatedAt();
    String getTrademark();
    Double getPrice();
    String getMetaData();
    String getDescription();
}
