package com.gogitek.orderecommerce.config.common.gogitek_response;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public class GogitekException extends Exception {
    public interface GogitekCode {
        int NotRetry = -1;
        int NotRegisterHandler = 1;
        int CantSave = 1000;
        int InvalidLoginInfo = 1001;
        int UserNotLogin = 1002;
        int ImageIsEmpty = 1100;
        int NotFound = 1101;
        int NotEnough = 1102;
        int SaleOrderNotFound = 1103;
        int SaleOrderCantConfirm = 1104;
        int SaleOrderCantReject = 1105;
        int DataInvalid = 1106;
        int NotSupport = 1107;
    }

    public enum Code implements GogitekCode {
        NOTRETRY(NotRetry),
        NOTREGISTERHANDLER(NotRegisterHandler),
        CANTSAVE(CantSave),
        INVALIDLOGININFO(InvalidLoginInfo),
        USERNOTLOGIN(UserNotLogin),
        IMAGEISEMPTY(ImageIsEmpty),
        NOTFOUND(NotFound),
        NOTENOUGH(NotEnough),
        SALEORDERNOTFOUND(SaleOrderNotFound),
        SALEORDERCANTCONFIRM(SaleOrderCantConfirm),
        SALEORDERCANTREJECT(SaleOrderCantReject),
        DATAINVALID(DataInvalid),
        NOTSUPPORT(NotSupport);

        private static final Map<Integer, Code> lookup = new HashMap<Integer, Code>();

        static {
            for (Code c : EnumSet.allOf(Code.class)) {
                lookup.put(c.code, c);
            }
        }

        private final int code;

        Code(int code) {
            this.code = code;
        }

        public int intValue() {
            return code;
        }

        public static Code get(int code) {
            return lookup.get(code);
        }
    }

    private Code code;
    private String message;

    public GogitekException(Code code) {
        this.code = code;
    }
    public GogitekException(Code code, String message) {
        this.code = code;
        this.message = message;
    }
    public int getCode() {
        return code.code;
    }

    public Code code() {
        return code;
    }

    public static GogitekException create(Code code) {
        return create(code, "");
    }

    public static class NotRetryException extends GogitekException {
        public NotRetryException(String message) {
            super(Code.NOTRETRY, String.format("Image not entered yet with content : [%s]", message));
        }
    }

    public static class NotEnoughException extends GogitekException{
        public NotEnoughException(){
            super(Code.NOTENOUGH, "Not enough deposit");
        }
    }

    public static class NotFoundException extends GogitekException{
        public NotFoundException(String object) {
            super(Code.NOTFOUND, String.format("Cannot found %s ", object));
        }
    }

    public static class ImageEmptyException extends GogitekException {
        public ImageEmptyException(String message) {
            super(Code.NOTRETRY, message);
        }
    }

    public static class NotRegisterHandlerException extends GogitekException {
        public NotRegisterHandlerException(String message) {
            super(Code.NOTREGISTERHANDLER, message);
        }
    }

    public static GogitekException create(Code code, String message) {
        switch (code) {
            case NOTRETRY:
                return new NotRetryException(message);
            case NOTREGISTERHANDLER:
                return new NotRegisterHandlerException(message);
            case IMAGEISEMPTY:
                return new ImageEmptyException(message);
            default:
                throw new IllegalArgumentException("Invalid exception code");
        }
    }

//    public static GogitekException create(Code code, @Nullable Object[] args) {
//        String message = MessageConfig.getMessage("GogitekException." + code.intValue(), args);
//        return create(code, message);
//    }
    public static String getCodeMessage(Code code){
        return code.toString();
    }

    public String getMessage() {
        return "GogitekErrorCode = " + getCode() + ", error: " +getCodeMessage(code)+ ((message != null && !message.equals("")) ? (", detail_error: " + message) : "");
    }
}
