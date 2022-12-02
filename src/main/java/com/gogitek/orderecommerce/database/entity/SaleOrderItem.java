package com.gogitek.orderecommerce.database.entity;

import com.gogitek.orderecommerce.common.constant.OrderStatus;
import com.gogitek.orderecommerce.controller.dto.req.CartItemRes;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "sale_order_item")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaleOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "config")
    private String config;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "channel")
    private String channel;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "created_on")
    private Instant createdOn;

    @Column(name = "updated_on")
    private Instant updatedOn;

    @Column(name = "status")
    private Integer status;

    @Column(name = "net_price")
    private Double netPrice;

    @Column(name = "vat_price")
    private Double vatPrice;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "discount")
    private Double discount;

    @Column(name = "bonus_point")
    private Integer bonusPoint;

    @Column(name = "sale_order_code")
    private String saleOrderCode;

    public Boolean canConfirm(){
        return OrderStatus.PENDING.getValue().equals(this.status);
    }

    public void confirm(){
        this.status = OrderStatus.BUYING.getValue();
        this.updatedOn = Instant.now();
    }

    public void cancel(){
        if(!OrderStatus.REJECTED.getValue().equals(this.status) && !OrderStatus.CANCELED.getValue().equals(this.status)) this.status = OrderStatus.CANCELED.getValue();
    }

    public Boolean canReject(){
        return OrderStatus.PENDING.getValue().equals(this.status) || OrderStatus.BUYING.getValue().equals(this.status);
    }

    public void reject(){
        this.status = OrderStatus.REJECTED.getValue();
        this.updatedOn = Instant.now();
    }
}

