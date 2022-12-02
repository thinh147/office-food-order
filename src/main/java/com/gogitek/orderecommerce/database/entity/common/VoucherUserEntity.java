package com.gogitek.orderecommerce.database.entity.common;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Setter
@Entity
@Table(name = "voucher_user_entity")
@Getter
public class VoucherUserEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "voucher_id")
    private Long voucherId;

    @Column(name = "quantity_remaining")
    private Integer quantityRemaining;

    @Column(name = "quantity")
    private Integer quantity;
}
