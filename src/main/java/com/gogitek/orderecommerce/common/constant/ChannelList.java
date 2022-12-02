package com.gogitek.orderecommerce.common.constant;

import java.util.HashMap;
import java.util.Map;

public enum ChannelList {
    AMAZON(1,"AMAZON"),
    MERCARI(2, "MERCARI");

    private Integer type;
    private String typeInStr;

    ChannelList(Integer type, String typeInStr){
        this.type = type;
        this.typeInStr = typeInStr;
    }

    public Integer getValue() {
        return this.type;
    }

    public String getTypeInStr() {
        return typeInStr;
    }

    private static final Map<Integer, ChannelList> BY_TYPE = new HashMap<>();

    private static final Map<String, ChannelList> BY_STRING = new HashMap<>();

    static {
        for (ChannelList e : values()) {
            BY_TYPE.put(e.type, e);
        }
    }

    static {
        for (ChannelList e : values()) {
            BY_STRING.put(e.typeInStr, e);
        }
    }

    public static ChannelList valueOfType(Integer type) {
        return BY_TYPE.get(type);
    }
    public static ChannelList valueOfString(String value) {
        return BY_STRING.get(value);
    }
}
