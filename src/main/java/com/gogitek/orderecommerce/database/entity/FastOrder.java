package com.gogitek.orderecommerce.database.entity;

import com.gogitek.orderecommerce.common.constant.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "fast_order")
@Getter
@Setter
public class FastOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "order_code")
    private String orderCode;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "completed_date")
    private Instant completedDate;

    @Column(name = "due_date")
    private Instant dueDate;

    @Column(name = "total_net_price")
    private Double netPrice;

    @Column(name = "total_vat_price")
    private Double vatPrice;

    @Column(name = "total_final_price")
    private Double finalPrice;

    @Column(name = "point_in_used")
    private Double pointInUsed;

    @Column(name = "voucher_price")
    private Double voucherPrice;

    @Column(name = "address_id")
    private Long addressId;

    @Column(name = "address")
    private String address;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "status")
    private Integer status;

    @Column(name = "order_type")
    private Integer orderType;

    @Column(name = "gross_code")
    private String grossCode;

    public Boolean canConfirm(){
        return OrderStatus.PENDING.getValue().equals(this.status);
    }

    public void confirm(){
        this.status = OrderStatus.BUYING.getValue();
        this.updatedAt = Instant.now();
    }

    public Boolean canReject(){
        return OrderStatus.PENDING.getValue().equals(this.status) || OrderStatus.BUYING.getValue().equals(this.status);
    }

    public void reject(){
        this.status = OrderStatus.REJECTED.getValue();
        this.updatedAt = Instant.now();
    }

    public void cancel(){
        if(!OrderStatus.CANCELED.getValue().equals(this.status) && !OrderStatus.REJECTED.getValue().equals(this.status)) this.status = OrderStatus.CANCELED.getValue();
    }

    public boolean isCanceled(){
        return OrderStatus.CANCELED.getValue().equals(this.status) && OrderStatus.REJECTED.getValue().equals(this.status);
    }
}
