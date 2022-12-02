package com.gogitek.orderecommerce.config.common.gogitek_response;

import com.gogitek.orderecommerce.common.constant.ResultCode;
import com.gogitek.orderecommerce.config.exception.LangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;

public class MultiLangException extends LangException {
    public MultiLangException(ResultCode resultCode, Object... args) {
        super(resultCode);
        Object[] newArgs = new Object[args.length + 1];
        System.arraycopy(args, 0, newArgs, 1, args.length);
        newArgs[0] = resultCode.getCode() + "";
        setTranslateArgs(newArgs);
    }

    public MultiLangException(ResultCodes resultCodes, Object... args) {
        this(resultCodes.getResultCode(), args);
    }
}
