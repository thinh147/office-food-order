package com.gogitek.orderecommerce.database.entity.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gogitek.orderecommerce.database.entity.common.MainCategory;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "sub_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at")
    @CreatedDate
    private Instant createdAt;

    @Column(name = "updated_at")
    @JsonIgnore
    @LastModifiedDate
    private Instant updatedAt;

    @Column(name = "channel")
    private String channel;

    @Column(name = "main_category_id")
    private Long mainCategoryId;
}
