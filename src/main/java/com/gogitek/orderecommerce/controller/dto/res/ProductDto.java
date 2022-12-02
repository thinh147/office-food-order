package com.gogitek.orderecommerce.controller.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;

    private String name;

    private Double price;

    private String description;

    private Double percentDiscount;

    private String imageUrl;
}
