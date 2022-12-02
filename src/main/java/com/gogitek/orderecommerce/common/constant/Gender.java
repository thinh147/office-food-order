package com.gogitek.orderecommerce.common.constant;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public enum Gender {
    NONE(0, "NONE"),
    MALE(1,"MALE"),
    FEMALE(2, "FEMALE"),
    OTHER(3, "OTHER");

    private Integer type;
    private String typeInStr;

    Gender(Integer type, String typeInStr){
        this.type = type;
        this.typeInStr = typeInStr;
    }

    public Integer getValue() {
        return this.type;
    }

    public String getTypeInStr() {
        return typeInStr;
    }

    private static final Map<Integer, Gender> BY_TYPE = new HashMap<>();

    private static final Map<String, Gender> BY_STRING = new HashMap<>();

    static {
        for (Gender e : values()) {
            BY_TYPE.put(e.type, e);
        }
    }

    static {
        for (Gender e : values()) {
            BY_STRING.put(e.typeInStr, e);
        }
    }

    public static Gender valueOfType(Integer type) {
        return BY_TYPE.get(type);
    }
    public static Gender valueOfString(String value) {
        return BY_STRING.get(value);
    }
}
