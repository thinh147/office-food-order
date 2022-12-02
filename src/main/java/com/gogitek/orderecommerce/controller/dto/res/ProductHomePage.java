package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductHomePage {
    List<ProductListRes> productRandom;
    List<ProductListRes> productSaleDesc;
}
