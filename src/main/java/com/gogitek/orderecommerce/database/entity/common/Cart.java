package com.gogitek.orderecommerce.database.entity.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "product_id", unique = true)
    private Long productId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "image_product")
    private String image;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "channel_name")
    private String channelName;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "meta_data")
    private String metaData;

    @Column(name = "percent_discount")
    private Double percentDiscount;

    @Column(name = "order_type")
    private Integer orderType;

    @Column(name = "product_url")
    private String productUrl;
}
