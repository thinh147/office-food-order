package com.gogitek.orderecommerce.database.entity;

import com.gogitek.orderecommerce.config.common.excel.InputProduct;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "input_product_entity")
public class InputProductEntity extends InputProduct {
    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    @Basic
    @Column(name = "product_name")
    public String getName() {
        return name;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    @Basic
    @Column(name = "url")
    public String getUrl() {
        return url;
    }

    @Basic
    @Column(name = "url_affiliate")
    public String getUrlAffiliate() {
        return urlAffiliate;
    }

    @Basic
    @Column(name = "image_url")
    public String getImageUrl() {
        return imageUrl;
    }

    @Basic
    @Column(name = "price")
    public Double getPrice() {
        return price;
    }

    @Basic
    @Column(name = "percent_discount")
    public Double getPercentDiscount() {
        return percentDiscount;
    }

    @Basic
    @Column(name = "channel")
    public String getChannel() {
        return channel;
    }

    @Basic
    @Column(name = "trade_mark")
    public String getTrademark() {
        return trademark;
    }

    @Basic
    @Column(name = "category")
    public String getCategory() {
        return category;
    }

    @Basic
    @Column(name = "meta_data")
    public String getMetaData() {
        return metaData;
    }

    @Basic
    @CreationTimestamp
    @Column(name = "created")
    public Timestamp getCreated() {
        return created;
    }

    @Basic
    @UpdateTimestamp
    @Column(name = "updated")
    public Timestamp getUpdated() {
        return updated;
    }

    @Override
    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }
}
