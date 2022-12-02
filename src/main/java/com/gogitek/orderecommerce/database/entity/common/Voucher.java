package com.gogitek.orderecommerce.database.entity.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "voucher")
@Getter
@Setter
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "discount")
    private Double discount;

    @Column(name = "min_value_to_use")
    private Double minValueToUse;

    @Column(name = "max_price")
    @Nullable
    private Double maxPriceDiscount;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "due_date")
    private Instant dueDate;

    @Column(name = "product_id")
    @Nullable
    private Long productId;

    @Column(name = "user_id")
    @Nullable
    private String userId;

    @Column(name = "user_email")
    @Nullable
    private String userEmail;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "is_active")
    private Integer isActive;

    @Column(name = "channel")
    private String channel;

    @Column(name = "discount_type")
    private Integer discountType; //DiscountType: 0 - percent, 1 - amount

    @ManyToMany()
    @JoinTable(name = "voucher_user_entity", joinColumns = @JoinColumn(name = "voucher_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Collection<User> users = new ArrayList<>();
}
