package com.gogitek.orderecommerce.database.entity.common;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ca_channel")
@Getter
@Setter
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "channel_name")
    private String name;
}
