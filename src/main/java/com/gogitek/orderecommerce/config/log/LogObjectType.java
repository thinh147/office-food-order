package com.gogitek.orderecommerce.config.log;


import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public enum LogObjectType {
    FAST_ORDER("FAST_ORDER", "Đặt hàng hộ", "fastOrder"),
    SALE_ORDER("SALE_ORDER", "Đơn bán web", "saleOrder"),
    GROSS_ORDER("GROSS_ORDER", "Đơn gộp", "grossOrder"),
    PAYMENT("PAYMENT", "Thanh toán", "payment")
    ;

    private static final Map<String, LogObjectType> codeToEnum;

    static {
        HashMap<String, LogObjectType> tmpMap = new HashMap<>();
        for (LogObjectType value : values()) {
            tmpMap.put(value.code.toUpperCase(), value);
        }
        codeToEnum = Collections.unmodifiableMap(tmpMap);
    }

    private final String code;
    private final String vi;
    private final String translationPrefix;

    @JsonCreator
    public static LogObjectType forValue(String value) {
        return StringUtils.isBlank(value) ? null : codeToEnum.get(value.toUpperCase());
    }

    public static LogObjectType of(String name) {
        return Arrays.stream(values())
                .filter(it -> it.name().equalsIgnoreCase(name))
                .findFirst().orElse(null);
    }

    public static String getViLang(LogObjectType type) {
        for (LogObjectType value : values()) {
            if (type.equals(value))
                return value.vi;
        }
        return null;
    }
}