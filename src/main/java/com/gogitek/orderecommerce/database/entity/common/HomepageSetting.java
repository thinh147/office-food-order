package com.gogitek.orderecommerce.database.entity.common;

import javax.persistence.*;

@Entity
@Table(name = "homepage_setting")
public class HomepageSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;
}
