package com.gogitek.orderecommerce.config.common.gogitek_response;


import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCode;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class ResponseBuilder {
    public ResponseBuilder() {
    }

    public static <E extends Content> Response status(E content, HttpStatus httpStatus) {
        return new Response(content, httpStatus);
    }

    protected static <E> Response buildPagingResponse(Collection<E> data, ResultCode resultCode, String message) {
        PaginationPage<E> paginationRS = new PaginationPage<>();
        paginationRS.setElements(data);
        paginationRS.setTotalElements((long)data.size());
        WrapContent<PaginationPage<E>> content = new WrapContent(resultCode.getCode(), message, paginationRS);
        return status(content, resultCode.getHttpStatus());
    }

    protected static <E> Response buildPagingResponse(Collection<E> data, long total, ResultCode resultCode, String message) {
        PaginationPage<E> paginationRS = new PaginationPage();
        paginationRS.setElements(data);
        paginationRS.setTotalElements(total);
        WrapContent<PaginationPage<E>> content = new WrapContent(resultCode.getCode(), message, paginationRS);
        return status(content, resultCode.getHttpStatus());
    }
}

