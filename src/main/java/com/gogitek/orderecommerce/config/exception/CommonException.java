package com.gogitek.orderecommerce.config.exception;

import com.gogitek.orderecommerce.common.constant.ResultCode;

public class CommonException extends RuntimeException {
    protected ResultCode resultCode;

    public CommonException(ResultCode resultCode) {
        super(resultCode.toString());
        this.resultCode = resultCode;
    }

    public CommonException(ResultCode resultCode, Throwable throwable) {
        super(throwable);
        this.resultCode = resultCode;
    }

    public String getMessage() {
        String var10000 = this.resultCode.toString();
        return "ResultCode is " + var10000 + " \n " + super.getMessage();
    }

    public ResultCode getResultCode() {
        return this.resultCode;
    }

    public void setResultCode(ResultCode resultCode) {
        this.resultCode = resultCode;
    }
}
