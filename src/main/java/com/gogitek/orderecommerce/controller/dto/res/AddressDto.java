package com.gogitek.orderecommerce.controller.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {

    private Long addressId;

    private String address;

    private String phone;

    private String name;
}
