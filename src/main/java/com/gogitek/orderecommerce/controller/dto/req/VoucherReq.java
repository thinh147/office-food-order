package com.gogitek.orderecommerce.controller.dto.req;

import com.gogitek.orderecommerce.controller.dto.res.UserDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VoucherReq {
    private Long id;
    private String title;
    private String code;
    private Integer quantity;
    private Integer quantityPerUser;
    private Boolean status;
    private Double discount;
    private Integer typeDiscount; //Amount or percent
    private Double priceDiscountMax;
    private String startDate; //MM/dd/yyyy
    private String endDate;
    private Integer orderType;
    private Integer gender; //null for all
    private List<Long> userIds;
    private String channel;
}
