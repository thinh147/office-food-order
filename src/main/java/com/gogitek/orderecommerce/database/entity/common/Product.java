package com.gogitek.orderecommerce.database.entity.common;

import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "code")
    private String productCode;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "product_url")
    private String productUrl;

    @Column(name = "affiliate_url")
    private String affiliateUrl;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "percent_discount")
    private Double percentDiscount;

    @Column(name = "channel")
    private String channel;

    @Column(name = "is_delete")
    private Boolean isDelete = false;

    @Column(name = "price")
    private Double price;

    @Column(name = "trademark")
    private String trademark;

    @Column(name = "meta_data")
    private String metaData;

    @CreatedDate
    @Column(name = "created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Metadata> metadataList = new ArrayList<>();
}
