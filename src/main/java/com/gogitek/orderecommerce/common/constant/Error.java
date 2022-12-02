package com.gogitek.orderecommerce.common.constant;

public class Error {
    private final String object;
    private final String reason;
    private final String message;

    public Error(String object, String reason, String message) {
        this.object = object;
        this.reason = reason;
        this.message = message;
    }

    public String getObject() {
        return this.object;
    }

    public String getReason() {
        return this.reason;
    }

    public String getMessage() {
        return this.message;
    }

    public String toString() {
        return "Error(object=" + this.getObject() + ", reason=" + this.getReason() + ", message=" + this.getMessage() + ")";
    }
}
