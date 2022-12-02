package com.gogitek.orderecommerce.database.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order { //Bảng này để gom đơn, đừng động chạm gì vào bảng này
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "order_code")
    private String orderCode;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "due_date")
    private Instant dueDate;

    @Column(name = "net_price")
    private Double netPrice;

    @Column(name = "commission")
    private Double commission;

    @Column(name = "status")
    private String status;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_address")
    private String customerAddress;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "order_date") //created_date
    private Instant orderDate;

    @Column(name = "completed_date")
    private Instant completedDate;

    @Column(name = "is_refund") //Có phải hoàn tiền không, mặc định là 0 lúc tạo, sau tính
    private Integer isRefund;

    @Column(name = "refund_status")
    private Long refundStatus;

    @Column(name = "refund_message")
    private String refundMessage;

    @Column(name = "notes")
    private String notes;

    @Column(name = "updated_time")
    private Instant updatedTime;

    @Column(name = "paid_point")
    private Integer paidPoint;

    @Column(name = "channel_id")
    private Long caId;

    @Column(name = "channel")
    private String channel;

    @Column(name = "payment_method_id")
    private Integer paymentMethodId;

    @Column(name = "payment_bank_id")
    private Integer paymentBankId;

    @Column(name = "gross_type")
    private Integer grossType;
}

