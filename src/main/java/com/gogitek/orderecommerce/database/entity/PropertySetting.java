package com.gogitek.orderecommerce.database.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "property_setting")
public class PropertySetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vat_percent")
    private Double vatPercent;

    @Column(name = "ship_fee") //Phí ship
    private Double shipFee;

    @Column(name = "exchange_rate") //Tỷ giá đặt hộ trên 1kg
    private Double exchangeRate;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;
}
