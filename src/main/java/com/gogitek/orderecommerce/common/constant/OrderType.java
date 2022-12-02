package com.gogitek.orderecommerce.common.constant;

import java.util.HashMap;
import java.util.Map;

public enum OrderType {
    SALE_ORDER(1), FAST_ORDER(2), GROSS_ORDER(3), DETACH_ORDER(4);

    private final Integer value;

    OrderType(Integer value){
        this.value = value;
    }
    public Integer getValue(){
        return this.value;
    }

    private static final Map<Integer, OrderType> BY_TYPE = new HashMap<>();

    static {
        for (OrderType e : values()) {
            BY_TYPE.put(e.value, e);
        }
    }
    public static OrderType valueOfType(Integer type) {
        return BY_TYPE.get(type);
    }
}
