package com.gogitek.orderecommerce.database.entity.common;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "main_category")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MainCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(name = "channel_id")
    private Long channelId;

    @Column(name = "channel_name")
    private String channelName;

    @Column(name = "title")
    private String title;

    public MainCategory(Long id){
        this.id = id;
    }
}
