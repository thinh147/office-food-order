package com.gogitek.orderecommerce.config.common.excel;

import com.gogitek.orderecommerce.config.abstracts.GogitekEntity;
import com.gogitek.orderecommerce.database.entity.InputProductFileEntity;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class InputProduct extends GogitekEntity {
    protected String name;

    protected String description;

    protected String url;

    protected String urlAffiliate;

    protected String imageUrl;

    protected Double price;

    protected Double percentDiscount;

    protected String channel;

    protected String trademark;

    protected String category;

    protected String metaData;

    protected Timestamp created;

    protected Timestamp updated;

    protected Long userId;

    protected InputProductFileEntity productFileEntity;
}
