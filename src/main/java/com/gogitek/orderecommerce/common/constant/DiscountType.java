package com.gogitek.orderecommerce.common.constant;

import java.util.Locale;

public enum DiscountType {
    PERCENT(1), AMOUNT(2);
    private final Integer value;

    DiscountType(Integer value){
        this.value = value;
    }

    public Integer getValue(){
        return this.value;
    }

    public String getName(){
        return this.name() == null ? "" : this.name().toLowerCase(Locale.ROOT);
    }
}
