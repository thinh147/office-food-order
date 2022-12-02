package com.gogitek.orderecommerce.controller.dto;

import com.gogitek.orderecommerce.database.entity.SaleOrder;
import com.gogitek.orderecommerce.database.entity.SaleOrderItem;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UpdateStatusSoDto {
    SaleOrder saleOrder;
    List<SaleOrderItem> saleOrderItem = new ArrayList<>();
}
