package com.gogitek.orderecommerce.controller.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressReq {

    private Long id;

    private String name;

    private String phone;

    private String address;
}
