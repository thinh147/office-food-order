package com.gogitek.orderecommerce.config.exception;

import com.gogitek.orderecommerce.common.constant.ResultCode;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;

public enum ResultCodes {
    GENERAL_ERROR(400, "error.generalError"),
    BAD_REQUEST(400, "error.badRequest"),
    FORBIDDEN(403, "error.forbidden"),
    NOT_NULL(1000, "error.notNull"),
    CANT_SAVE(GogitekException.Code.CANTSAVE.intValue(), "error.cantSave"),
    INVALID_LOGIN_INFO(GogitekException.Code.INVALIDLOGININFO.intValue(), "error.invalidUserNameOrPassWord"),
    CART_NOT_EMPTY(1001, "error.cartNotEmpty"),
    CART_USER_NOT_EMPTY(1002, "cart.userNotEmpty"),
    DATA_EMPTY(1003, "data.empty"),
    USER_NOT_LOGIN(GogitekException.Code.USERNOTLOGIN.intValue(), "user.notLogin"),
    CANT_DELETE(1004, "cart.cantDelete"),
    SALE_ORDER_NOT_FOUND(GogitekException.Code.SALEORDERNOTFOUND.intValue(), "saleOrder.notFound"),
    SALE_ORDER_CANT_CONFIRM(GogitekException.Code.SALEORDERCANTCONFIRM.intValue(), "saleOrder.cantConfirm"),
    SALE_ORDER_CANT_REJECT(GogitekException.Code.SALEORDERCANTREJECT.intValue(), "saleOrder.cantReject"),
    DATA_INVALID(GogitekException.Code.DATAINVALID.intValue(), "data.inValid"),
    NOT_SUPPORT(GogitekException.Code.NOTSUPPORT.intValue(), "notSupport");

    private final ResultCode resultCode;

    ResultCodes(int code, String message) {
        this.resultCode = new ResultCode(code, message);
    }

    public ResultCode getResultCode() {
        return resultCode;
    }

    public int getCode() {
        return resultCode.getCode();
    }

    public String getMessage() {
        return resultCode.getMessage();
    }
}
