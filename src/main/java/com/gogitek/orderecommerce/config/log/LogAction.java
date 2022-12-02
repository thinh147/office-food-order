package com.gogitek.orderecommerce.config.log;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public enum LogAction {
    ADD("ADD"),
    UPDATE("UPDATE"),
    DELETE("DELETE"),
    ;

    private static final Map<String, LogAction> codeToEnum;

    static {
        HashMap<String, LogAction> tmpMap = new HashMap<>();
        for (LogAction value : values()) {
            tmpMap.put(value.code.toUpperCase(), value);
        }
        codeToEnum = Collections.unmodifiableMap(tmpMap);
    }

    private final String code;

    @JsonCreator
    public static LogAction forValue(String value) {
        return StringUtils.isBlank(value) ? null : codeToEnum.get(value.toUpperCase());
    }
}