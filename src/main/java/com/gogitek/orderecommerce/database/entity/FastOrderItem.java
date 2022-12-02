package com.gogitek.orderecommerce.database.entity;

import com.gogitek.orderecommerce.common.constant.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "fast_order_item")
@Getter
@Setter
public class FastOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fast_order_code")
    private String fastOrderCode;

    @Column(name = "product_url")
    private String productUrl;

    @Column(name = "color")
    private String color;

    @Column(name = "size")
    private String size;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "total_net_price")
    private Double netPrice;

    @Column(name = "total_vat_amount")
    private Double vatAmount;

    @Column(name = "percent_discount")
    private Double percentDiscount;

    @Column(name = "discount_price")
    private Double discountPrice;

    @Column(name = "final_price")
    private Double finalPrice;

    @Column(name = "note")
    private String note;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "status")
    private Integer status;

    public Boolean canConfirm(){
        return OrderStatus.PENDING.getValue().equals(this.status);
    }

    public void confirm(){
        this.status = OrderStatus.BUYING.getValue();
        this.updatedAt = Instant.now();
    }

    public void cancel(){
        if(!OrderStatus.REJECTED.getValue().equals(this.status) && !OrderStatus.CANCELED.getValue().equals(this.status)) this.status = OrderStatus.CANCELED.getValue();
    }

    public Boolean canReject(){
        return OrderStatus.PENDING.getValue().equals(this.status) || OrderStatus.BUYING.getValue().equals(this.status);
    }

    public void reject(){
        this.status = OrderStatus.REJECTED.getValue();
        this.updatedAt = Instant.now();
    }
}
