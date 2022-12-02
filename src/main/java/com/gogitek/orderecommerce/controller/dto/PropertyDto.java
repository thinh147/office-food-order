package com.gogitek.orderecommerce.controller.dto;
import lombok.Setter;

@Setter
public class PropertyDto {
    public Long id;
    public Double vatPercent;
    public Double shipFee;
    public Double exchangeRate;
}
