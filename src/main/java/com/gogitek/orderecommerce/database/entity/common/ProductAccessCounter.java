package com.gogitek.orderecommerce.database.entity.common;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "product_access_counter")
@Entity
@Data
public class ProductAccessCounter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "counter")
    private Integer counter;

    @Column(name = "created_at")
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;
}
