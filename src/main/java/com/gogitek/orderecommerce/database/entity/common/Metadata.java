package com.gogitek.orderecommerce.database.entity.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "metadata")
@Getter
@Setter
public class Metadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "config_name")
    private String configName;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "options")
    private String options;

    @CreatedDate
    @Column(name = "created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "is_active")
    private Integer isActive; //0 : in_active, 1 : active

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "id", name = "product_id")
    private Product product;
}
