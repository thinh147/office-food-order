package com.gogitek.orderecommerce.config.common.gogitek_response;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCode;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Collection;
@Component
public class GogitekResponse extends ResponseBuilder {
    private static final Logger log = LoggerFactory.getLogger(GogitekResponse.class);
    protected static TranslateService translateService;

    public GogitekResponse() {
    }

    public static Response ok() {
        return status(ResultCodes.SUCCESS);
    }

    public static <E> Response ok(E data) {
        return status(ResultCodes.SUCCESS, data);
    }

    public static <E> Response ok(String lang, E data) {
        return status(lang, ResultCodes.SUCCESS, data);
    }

    public static <E> Response ok(Collection<E> data) {
        return status(ResultCodes.SUCCESS, data);
    }

    public static <E> Response ok(Collection<E> data, long total) {
        return status(ResultCodes.SUCCESS, data, total);
    }

    public static <E> Response status(ResultCode resultCode, E data) {
        String message = translateService.translate(resultCode.getMessage());
        WrapContent<E> content = new WrapContent(resultCode.getCode(), message, data);
        return status((Content) content, (HttpStatus)resultCode.getHttpStatus());
    }

    public static <E> Response status(String lang, ResultCode resultCode, E data) {
        String message = translateService.translateWithLang(lang, resultCode.getMessage());
        WrapContent<E> content = new WrapContent(resultCode.getCode(), message, data);
        return status((Content)content, (HttpStatus)resultCode.getHttpStatus());
    }

    public static Response status(ResultCode resultCode) {
        String message = translateService.translate(resultCode.getMessage());
        Content content = new Content(resultCode.getCode(), message);
        return status((Content)content, (HttpStatus)resultCode.getHttpStatus());
    }

    public static <E> Response status(ResultCode resultCode, Collection<E> data) {
        String message = translateService.translate(resultCode.getMessage());
        return buildPagingResponse(data, resultCode, message);
    }

    public static <E> Response status(ResultCode resultCode, Collection<E> data, long total) {
        String message = translateService.translate(resultCode.getMessage());
        return buildPagingResponse(data, total, resultCode, message);
    }

    public static Response fail(ResultCode resultCode, Collection<Error> errors) {
        String message = translateService.translate(resultCode.getMessage());
        ErrorHandle content = new ErrorHandle(resultCode.getCode(), message, errors);
        return status((Content)content, (HttpStatus)resultCode.getHttpStatus());
    }

    public static Response fail(String lang, ResultCode resultCode, Collection<Error> errors, String... translateArgs) {
        String message = translateService.translateWithLangAndArgs(lang, resultCode.getMessage(), translateArgs);
        ErrorHandle content = new ErrorHandle(resultCode.getCode(), message, errors);
        return status((Content)content, (HttpStatus)resultCode.getHttpStatus());
    }

    public static Response fail(ResultCode resultCode, Collection<Error> errors, String... translateArgs) {
        String message = translateService.translateWithArgs(resultCode.getMessage(), translateArgs);
        ErrorHandle content = new ErrorHandle(resultCode.getCode(), message, errors);
        return status((Content)content, (HttpStatus)resultCode.getHttpStatus());
    }

    @Autowired
    public void setTranslateService(TranslateService translateService) {
        GogitekResponse.translateService = translateService;
    }
}