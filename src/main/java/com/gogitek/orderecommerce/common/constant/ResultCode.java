package com.gogitek.orderecommerce.common.constant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.http.HttpStatus;

public final class ResultCode {
    private final int code;
    private final String message;
    @JsonIgnore
    private final HttpStatus httpStatus;

    public ResultCode(int code, String message) {
        this.code = code;
        this.message = message;
        this.httpStatus = HttpStatus.OK;
    }

    public String toString() {
        return "ResultCode{code=" + this.code + ", message='" + this.message + "', httpStatus=" + this.httpStatus + "}";
    }

    public int getCode() {
        return this.code;
    }

    public String getMessage() {
        return this.message;
    }

    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    public ResultCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}

