package com.gogitek.orderecommerce.common.constant;

import java.util.HashMap;
import java.util.Map;

public enum AccountRole {
    CUSTOMER(1,"CUSTOMER"),
    ADMIN(2, "ADMIN"),
    SHIPPER(3, "SHIPPER");

    private final Integer type;
    private final String typeInStr;

    AccountRole(Integer type, String typeInStr){
        this.type = type;
        this.typeInStr = typeInStr;
    }

    public Integer getValue() {
        return this.type;
    }

    public String getTypeInStr() {
        return typeInStr;
    }

    private static final Map<Integer, AccountRole> BY_TYPE = new HashMap<>();

    private static final Map<String, AccountRole> BY_STRING = new HashMap<>();

    static {
        for (AccountRole e : values()) {
            BY_TYPE.put(e.type, e);
        }
    }

    static {
        for (AccountRole e : values()) {
            BY_STRING.put(e.typeInStr, e);
        }
    }

    public static AccountRole valueOfType(Integer type) {
        return BY_TYPE.get(type);
    }

    public static AccountRole valueOfString(String value) {
        return BY_STRING.get(value);
    }
}
