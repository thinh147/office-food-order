package com.gogitek.orderecommerce.common.constant;

import java.util.Arrays;

public enum ProductImportStatus {
    INIT, IN_PROCESSING, COMPLETED;

    public static ProductImportStatus getStatusByStr(String status) {
        return Arrays.stream(values()).filter(it -> it.name().equals(status)).findFirst().orElse(null);
    }
}
