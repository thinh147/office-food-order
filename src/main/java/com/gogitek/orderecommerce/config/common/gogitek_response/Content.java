package com.gogitek.orderecommerce.config.common.gogitek_response;

import java.io.Serializable;
import java.util.Collection;

public class Content implements Serializable {
    protected int code;
    protected String message;

    public int getCode() {
        return this.code;
    }

    public String getMessage() {
        return this.message;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Content(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public String toString() {
        int var10000 = this.getCode();
        return "BaseContent(code=" + var10000 + ", message=" + this.getMessage() + ")";
    }

    public Content() {
    }
}
