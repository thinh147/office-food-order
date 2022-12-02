package com.gogitek.orderecommerce.database.entity;

import javax.persistence.*;

@Entity
@Table(name = "refund_sale_order")
public class RefundSaleOrder {//Hoàn tiền

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;
}
