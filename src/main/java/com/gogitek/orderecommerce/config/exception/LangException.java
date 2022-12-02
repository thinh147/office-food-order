package com.gogitek.orderecommerce.config.exception;

import com.gogitek.orderecommerce.common.constant.ResultCode;
import com.gogitek.orderecommerce.common.constant.ResultCodes;

import java.util.Arrays;

public class LangException extends CommonException{
    private String lang;
    private Object[] translateArgs;

    public String toString() {
        String var10000 = this.lang;
        return "LangException{lang='" + var10000 + "', translateArgs=" + Arrays.toString(this.translateArgs) + ", resultCode=" + this.resultCode + "}";
    }

    public LangException(ResultCode resultCode, Object... translateArgs) {
        super(resultCode);
        this.translateArgs = translateArgs;
    }

    public LangException(ResultCode resultCode, Throwable throwable, Object... translateArgs) {
        super(resultCode, throwable);
        this.translateArgs = translateArgs;
    }

    public LangException(String lang, ResultCode resultCode) {
        super(resultCode);
        this.lang = lang;
    }

    public LangException(String lang, ResultCode resultCode, Throwable throwable) {
        super(resultCode, throwable);
        this.lang = lang;
    }

    public LangException(ResultCode resultCode, Throwable throwable) {
        super(resultCode, throwable);
    }

    public LangException(String lang, ResultCode resultCode, Object... translateArgs) {
        super(resultCode);
        this.lang = lang;
        this.translateArgs = translateArgs;
    }

    public LangException(String lang, ResultCode resultCode, Throwable throwable, Object... translateArgs) {
        super(resultCode, throwable);
        this.lang = lang;
        this.translateArgs = translateArgs;
    }

    public String getMessage() {
        String var10000 = super.getMessage();
        return var10000 + ", instance: " + this.toString();
    }

    public void setTranslateArgs(Object... translateArgs) {
        this.translateArgs = translateArgs;
    }

    public String getLang() {
        return this.lang;
    }

    public Object[] getTranslateArgs() {
        return this.translateArgs;
    }
}
