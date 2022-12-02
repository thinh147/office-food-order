package com.gogitek.orderecommerce.database.entity.common;

import com.gogitek.orderecommerce.database.entity.SaleOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    private String address;

    private String phone;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
