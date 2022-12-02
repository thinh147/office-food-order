package com.gogitek.orderecommerce.controller.dto.res;

import com.gogitek.orderecommerce.controller.dto.req.CartItemRes;
import com.gogitek.orderecommerce.database.entity.common.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleOrderDto {

    User user;

    String address;

    String name;

    String phone;

    List<CartItemRes> cartItemResList;

}
