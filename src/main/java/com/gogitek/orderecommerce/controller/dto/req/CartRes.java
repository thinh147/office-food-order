package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CartRes {
    Double totalPriceVnd;
    Double totalPriceYen;
    Integer totalItem;
    List<CartItemRes> items = new ArrayList<>();
}
