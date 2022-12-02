package com.gogitek.orderecommerce.common.constant;

import java.util.HashMap;
import java.util.Map;

public enum OrderStatus {
    PENDING(1),
    BUYING(2),
    BUYING_COMPLETED(3),
    DELIVERING_VN(4),
    DELIVERING(5),
    DELIVERED(6),
    COMPLETED(7),
    CANCELED(8),
    REJECTED(9),
    MERGING(10),
    TRANSFERING(11);

    private Integer type;
    private String typeInStr;

    OrderStatus(Integer type) {
        this.type = type;
    }

    public Integer getValue() {
        return this.type;
    }
    public String getTypeInStr() {return this.typeInStr;}

    private static final Map<Integer, OrderStatus> BY_TYPE = new HashMap<>();
    private static final Map<String, OrderStatus> BY_STRING = new HashMap<>();

    static {
        for (OrderStatus e : values()) {
            BY_TYPE.put(e.type, e);
        }
    }

    static {
        for(OrderStatus e : values()) {
            BY_STRING.put(e.typeInStr, e);
        }
    }

    static {
        for (OrderStatus e : values()) {
            BY_STRING.put(e.typeInStr, e);
        }
    }

    public static OrderStatus valueOfString(String value) {
        return BY_STRING.get(value);
    }
    public static String valueOfType(Integer type) {
        return BY_TYPE.get(type).typeInStr;
    }
}
