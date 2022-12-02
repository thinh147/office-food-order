package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.PaymentSearchOption;
import com.gogitek.orderecommerce.database.converter.PaymentListConverter;
import com.gogitek.orderecommerce.database.entity.common.CommonPayment;

import java.util.Optional;

public interface PaymentDao {
    void savePayment(CommonPayment commonPayment);

    PaginationPage<PaymentListConverter> getListPaymentConverter(PaymentSearchOption option);

    Optional<CommonPayment> findPaymentByOrderCode(String orderCode);
}
