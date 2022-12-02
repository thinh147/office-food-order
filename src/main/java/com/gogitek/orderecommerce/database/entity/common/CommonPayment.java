package com.gogitek.orderecommerce.database.entity.common;

import com.gogitek.orderecommerce.common.constant.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "common_payment")
@Getter
@Setter
public class CommonPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "order_code")
    private String orderCode;

    @Column(name = "payment_time")
    private Instant paymentTime;

    @Column(name = "deposit_percent")
    private Double depositPercent;

    @Column(name = "image_payment")
    private String imagePayment;

    @Column(name = "deposit_amount")
    private Double depositAmount;

    @Column(name = "remaining_amount")
    private Double remainingAmount;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "status")
    private Integer status;

    @Column(name = "failed_at")
    private Instant failedAt;

    @Column(name = "error_code")
    private Integer errorCode;

    @Column(name = "error_text")
    private String errorText;

    @Column(name = "order_type")
    private Integer orderType;

    public Integer confirm(){
        if(this.status == PaymentStatus.PENDING.getValue()) {
            return PaymentStatus.CONFIRMED.getValue();
        }
        return this.status;
    }

    public Boolean canReject(){
        return PaymentStatus.PENDING.getValue() == this.status || PaymentStatus.CONFIRMED.getValue() == this.status;
    }

    public void reject(){
        this.status = PaymentStatus.REJECTED.getValue();
    }

    public void init(){
        this.status = PaymentStatus.PENDING.getValue();
        this.paymentTime = Instant.now();
    }

    public void failHandle(String errorText, Integer errorCode) {
        this.errorText = errorText;
        this.errorCode = errorCode;
        this.failedAt = Instant.now();
    }

    public Boolean canRetry(){
        return this.failedAt != null;
    }
}
