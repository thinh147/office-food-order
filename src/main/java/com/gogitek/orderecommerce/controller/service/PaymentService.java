package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.controller.dto.req.PaymentReq;
import com.gogitek.orderecommerce.controller.dto.req.PaymentSearchOption;
import com.gogitek.orderecommerce.controller.dto.res.PaymentListRes;

public interface PaymentService {
    void createPayment(PaymentReq paymentInput) throws GogitekException;
    PaginationPage<PaymentListRes> getListPayment(PaymentSearchOption option);
    void confirm(String orderCode);
}
