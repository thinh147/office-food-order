package com.gogitek.orderecommerce.database.entity.common;

import javax.persistence.*;

@Entity
@Table(name = "accumlated_points")
public class AccumulatedPoints {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;
}
